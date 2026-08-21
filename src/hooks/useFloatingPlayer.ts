import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  FLOATING_PLAYER_DRAG_THRESHOLD,
  clampFloatingPosition,
  defaultFloatingPlayerPosition,
  finalizeFloatingPlacement,
  floatingRect,
  floatingRectsOverlap,
  getDesktopReservedRects,
  restoreFloatingPosition,
  shouldBeginFloatingDrag,
  type FloatingPlacement,
  type FloatingPoint,
  type FloatingSize,
} from "../lib/floatingWindow";

const FLOATING_PLAYER_POSITION_KEY = "nexformo.music.floating-position.v1";

type DragSession = {
  pointerId: number;
  handle: HTMLElement;
  pointerOrigin: FloatingPoint;
  positionOrigin: FloatingPoint;
  latestPointer: FloatingPoint;
  moved: boolean;
};

const getViewport = () => ({
  width: Math.max(1, window.innerWidth),
  height: Math.max(1, window.innerHeight),
});

const readSavedPosition = (): FloatingPoint | null => {
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(FLOATING_PLAYER_POSITION_KEY) || "null",
    ) as { x?: unknown; y?: unknown } | null;
    if (!parsed || typeof parsed.x !== "number" || typeof parsed.y !== "number") return null;
    return { x: parsed.x, y: parsed.y };
  } catch {
    return null;
  }
};

const persistPosition = (position: FloatingPoint) => {
  try {
    window.localStorage.setItem(
      FLOATING_PLAYER_POSITION_KEY,
      JSON.stringify({ x: Math.round(position.x), y: Math.round(position.y) }),
    );
  } catch {
    // Position persistence is optional; dragging remains usable for this session.
  }
};

const elementSize = (element: HTMLElement): FloatingSize => {
  const bounds = element.getBoundingClientRect();
  return {
    width: Math.max(1, bounds.width),
    height: Math.max(1, bounds.height),
  };
};

const isInteractiveDragTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(target.closest("button, a, input, textarea, select, [role='button'], [data-no-drag]"));

export function useFloatingPlayer(options: {
  enabled: boolean;
  timelineVisible?: boolean;
  stageVisible?: boolean;
  sideRailsVisible?: boolean;
  snap?: boolean;
}) {
  const windowRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef<DragSession | null>(null);
  const positionRef = useRef<FloatingPoint>({ x: 0, y: 0 });
  const pendingPositionRef = useRef<FloatingPoint | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const releaseListenersCleanupRef = useRef<(() => void) | null>(null);
  const [position, setPosition] = useState<FloatingPoint>({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [collisionNotice, setCollisionNotice] = useState("");
  const [motion, setMotion] = useState<FloatingPlacement["motion"]>("instant");
  const reducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  positionRef.current = position;

  const reservedRects = useCallback(
    () =>
      getDesktopReservedRects(getViewport(), {
        timelineVisible: options.timelineVisible,
        stageVisible: options.stageVisible,
        sideRailsVisible: options.sideRailsVisible,
      }),
    [options.sideRailsVisible, options.stageVisible, options.timelineVisible],
  );

  const applyPositionImmediately = useCallback((next: FloatingPoint) => {
    const element = windowRef.current;
    if (!element) return;
    element.style.left = `${next.x}px`;
    element.style.top = `${next.y}px`;
    element.style.transform = "";
  }, []);

  const commitPlacement = useCallback(
    (
      rawPosition: FloatingPoint,
      config: { persist?: boolean; snap?: boolean; avoidCollisions?: boolean } = {},
    ) => {
      const element = windowRef.current;
      if (!element) return null;
      const size = elementSize(element);
      const occupied = reservedRects();
      const avoidCollisions = config.avoidCollisions !== false;
      const placement = finalizeFloatingPlacement({
        position: rawPosition,
        size,
        viewport: getViewport(),
        reservedRects: avoidCollisions ? occupied : [],
        reducedMotion,
        snap: config.snap ?? options.snap !== false,
      });
      const overlapsInterface = occupied.some((rect) =>
        floatingRectsOverlap(floatingRect(placement.position, size), rect),
      );
      applyPositionImmediately(placement.position);
      positionRef.current = placement.position;
      setPosition(placement.position);
      setMotion(placement.motion);
      setCollisionNotice(
        avoidCollisions && placement.collided
          ? "已为默认位置避让侧栏、舞台字幕或时间线。"
          : overlapsInterface
            ? "当前位置可能遮挡侧栏或时间线；这是你选择的位置，不会被自动移回中央。"
            : "",
      );
      if (config.persist !== false) persistPosition(placement.position);
      return placement;
    },
    [applyPositionImmediately, options.snap, reducedMotion, reservedRects],
  );

  const clearTransientDrag = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    pendingPositionRef.current = null;
    if (windowRef.current) windowRef.current.style.transform = "";
    setDragging(false);
  }, []);

  const releasePointerCapture = (session: DragSession) => {
    try {
      if (session.handle.hasPointerCapture(session.pointerId)) {
        session.handle.releasePointerCapture(session.pointerId);
      }
    } catch {
      // Pointer capture can already be gone after window blur.
    }
  };

  const cancelDrag = useCallback(() => {
    const session = dragRef.current;
    if (!session) return;
    releaseListenersCleanupRef.current?.();
    releaseListenersCleanupRef.current = null;
    releasePointerCapture(session);
    dragRef.current = null;
    clearTransientDrag();
    applyPositionImmediately(session.positionOrigin);
    positionRef.current = session.positionOrigin;
    setPosition(session.positionOrigin);
  }, [applyPositionImmediately, clearTransientDrag]);

  const endDrag = useCallback(() => {
    const session = dragRef.current;
    if (!session) return;
    releaseListenersCleanupRef.current?.();
    releaseListenersCleanupRef.current = null;
    releasePointerCapture(session);
    dragRef.current = null;
    const finalPosition = session.moved
      ? pendingPositionRef.current ?? {
          x: session.positionOrigin.x + session.latestPointer.x - session.pointerOrigin.x,
          y: session.positionOrigin.y + session.latestPointer.y - session.pointerOrigin.y,
        }
      : session.positionOrigin;
    clearTransientDrag();
    if (session.moved) {
      commitPlacement(finalPosition, {
        persist: true,
        snap: true,
        avoidCollisions: false,
      });
    }
  }, [clearTransientDrag, commitPlacement]);

  useLayoutEffect(() => {
    const element = windowRef.current;
    if (!options.enabled || !element) return;
    const size = elementSize(element);
    const viewport = getViewport();
    const savedPosition = ready ? positionRef.current : readSavedPosition();
    const restored = restoreFloatingPosition(
      savedPosition,
      size,
      viewport,
    );
    const initial = finalizeFloatingPlacement({
      position: restored,
      size,
      viewport,
      reservedRects: savedPosition ? [] : reservedRects(),
      reducedMotion: true,
      snap: false,
    });
    applyPositionImmediately(initial.position);
    positionRef.current = initial.position;
    setPosition(initial.position);
    setReady(true);
  }, [applyPositionImmediately, options.enabled, ready, reservedRects]);

  useEffect(() => {
    const element = windowRef.current;
    if (!options.enabled || !element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      if (!dragRef.current) {
        commitPlacement(positionRef.current, {
          persist: false,
          snap: false,
          avoidCollisions: false,
        });
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [commitPlacement, options.enabled]);

  useEffect(() => {
    const handleResize = () => {
      if (!options.enabled || dragRef.current) return;
      commitPlacement(positionRef.current, {
        persist: true,
        snap: false,
        avoidCollisions: false,
      });
    };
    const handleBlur = () => cancelDrag();
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && dragRef.current) {
        event.preventDefault();
        cancelDrag();
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("pointerup", endDrag, true);
    window.addEventListener("pointercancel", cancelDrag, true);
    window.addEventListener("mouseup", endDrag, true);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("pointerup", endDrag, true);
      window.removeEventListener("pointercancel", cancelDrag, true);
      window.removeEventListener("mouseup", endDrag, true);
    };
  }, [cancelDrag, commitPlacement, endDrag, options.enabled]);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
    },
    [],
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!options.enabled || event.button !== 0 || isInteractiveDragTarget(event.target)) return;
      const session: DragSession = {
        pointerId: event.pointerId,
        handle: event.currentTarget,
        pointerOrigin: { x: event.clientX, y: event.clientY },
        positionOrigin: positionRef.current,
        latestPointer: { x: event.clientX, y: event.clientY },
        moved: false,
      };
      dragRef.current = session;
      event.currentTarget.setPointerCapture(event.pointerId);
      const release = () => endDrag();
      const cancel = () => cancelDrag();
      const cleanup = () => {
        document.removeEventListener("pointerup", release, true);
        document.removeEventListener("mouseup", release, true);
        document.removeEventListener("pointercancel", cancel, true);
        session.handle.removeEventListener("lostpointercapture", release);
      };
      releaseListenersCleanupRef.current?.();
      releaseListenersCleanupRef.current = cleanup;
      document.addEventListener("pointerup", release, true);
      document.addEventListener("mouseup", release, true);
      document.addEventListener("pointercancel", cancel, true);
      session.handle.addEventListener("lostpointercapture", release, { once: true });
    },
    [cancelDrag, endDrag, options.enabled],
  );

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const session = dragRef.current;
    if (!session || session.pointerId !== event.pointerId) return;
    session.latestPointer = { x: event.clientX, y: event.clientY };
    if (!session.moved) {
      session.moved = shouldBeginFloatingDrag(
        session.pointerOrigin,
        session.latestPointer,
        FLOATING_PLAYER_DRAG_THRESHOLD,
      );
      if (!session.moved) return;
      setDragging(true);
      setCollisionNotice("");
    }
    const element = windowRef.current;
    const rawPosition = {
      x: session.positionOrigin.x + session.latestPointer.x - session.pointerOrigin.x,
      y: session.positionOrigin.y + session.latestPointer.y - session.pointerOrigin.y,
    };
    pendingPositionRef.current = element
      ? clampFloatingPosition(rawPosition, elementSize(element), getViewport())
      : rawPosition;
    if (animationFrameRef.current !== null) return;
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      const pending = pendingPositionRef.current;
      const element = windowRef.current;
      if (!pending || !element) return;
      element.style.transform = `translate3d(${pending.x - session.positionOrigin.x}px, ${pending.y - session.positionOrigin.y}px, 0)`;
    });
  }, []);

  const resetPosition = useCallback(() => {
    const element = windowRef.current;
    if (!element) return;
    const next = defaultFloatingPlayerPosition(elementSize(element), getViewport());
    commitPlacement(next, { persist: true, snap: false, avoidCollisions: true });
  }, [commitPlacement]);

  const style = {
    left: position.x,
    top: position.y,
    visibility: ready ? "visible" : "hidden",
  } satisfies CSSProperties;

  return {
    windowRef,
    style,
    ready,
    dragging,
    motion,
    collisionNotice,
    resetPosition,
    dragHandleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: cancelDrag,
    },
  };
}
