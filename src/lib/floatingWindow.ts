export type FloatingPoint = { x: number; y: number };
export type FloatingSize = { width: number; height: number };
export type FloatingViewport = { width: number; height: number };
export type FloatingRect = FloatingPoint & FloatingSize;
export type FloatingSnapRegion =
  | "none"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center-left"
  | "center-right"
  | "top-center"
  | "bottom-center";

export type FloatingPlacement = {
  position: FloatingPoint;
  snapRegion: FloatingSnapRegion;
  collided: boolean;
  motion: "smooth" | "instant";
};

export const FLOATING_PLAYER_MARGIN = 18;
export const FLOATING_PLAYER_GAP = 12;
export const FLOATING_PLAYER_DRAG_THRESHOLD = 5;

const finite = (value: number, fallback = 0) =>
  Number.isFinite(value) ? value : fallback;

const distanceSquared = (left: FloatingPoint, right: FloatingPoint) =>
  (left.x - right.x) ** 2 + (left.y - right.y) ** 2;

export function shouldBeginFloatingDrag(
  origin: FloatingPoint,
  current: FloatingPoint,
  threshold = FLOATING_PLAYER_DRAG_THRESHOLD,
) {
  return Math.hypot(current.x - origin.x, current.y - origin.y) >= Math.max(0, threshold);
}

export function clampFloatingPosition(
  rawPosition: FloatingPoint,
  size: FloatingSize,
  viewport: FloatingViewport,
  margin = FLOATING_PLAYER_MARGIN,
): FloatingPoint {
  const safeMargin = Math.max(0, finite(margin));
  const width = Math.max(1, finite(size.width, 1));
  const height = Math.max(1, finite(size.height, 1));
  const viewportWidth = Math.max(width, finite(viewport.width, width));
  const viewportHeight = Math.max(height, finite(viewport.height, height));
  const minimumX = Math.min(safeMargin, Math.max(0, viewportWidth - width));
  const minimumY = Math.min(safeMargin, Math.max(0, viewportHeight - height));
  const maximumX = Math.max(minimumX, viewportWidth - width - safeMargin);
  const maximumY = Math.max(minimumY, viewportHeight - height - safeMargin);
  return {
    x: Math.min(maximumX, Math.max(minimumX, finite(rawPosition.x, minimumX))),
    y: Math.min(maximumY, Math.max(minimumY, finite(rawPosition.y, minimumY))),
  };
}

export function defaultFloatingPlayerPosition(
  size: FloatingSize,
  viewport: FloatingViewport,
  margin = FLOATING_PLAYER_MARGIN,
) {
  return clampFloatingPosition(
    {
      x: (viewport.width - size.width) / 2,
      y: Math.max(82, margin),
    },
    size,
    viewport,
    margin,
  );
}

export function restoreFloatingPosition(
  rawPosition: FloatingPoint | null | undefined,
  size: FloatingSize,
  viewport: FloatingViewport,
  margin = FLOATING_PLAYER_MARGIN,
) {
  if (!rawPosition || !Number.isFinite(rawPosition.x) || !Number.isFinite(rawPosition.y)) {
    return defaultFloatingPlayerPosition(size, viewport, margin);
  }
  return clampFloatingPosition(rawPosition, size, viewport, margin);
}

export function floatingRect(position: FloatingPoint, size: FloatingSize): FloatingRect {
  return { x: position.x, y: position.y, width: size.width, height: size.height };
}

export function floatingRectsOverlap(left: FloatingRect, right: FloatingRect, gap = 0) {
  return !(
    left.x + left.width + gap <= right.x ||
    right.x + right.width + gap <= left.x ||
    left.y + left.height + gap <= right.y ||
    right.y + right.height + gap <= left.y
  );
}

const overlapArea = (left: FloatingRect, right: FloatingRect) => {
  const width = Math.max(
    0,
    Math.min(left.x + left.width, right.x + right.width) - Math.max(left.x, right.x),
  );
  const height = Math.max(
    0,
    Math.min(left.y + left.height, right.y + right.height) - Math.max(left.y, right.y),
  );
  return width * height;
};

export function resolveFloatingCollisions(
  rawPosition: FloatingPoint,
  size: FloatingSize,
  viewport: FloatingViewport,
  reservedRects: FloatingRect[],
  margin = FLOATING_PLAYER_MARGIN,
  gap = FLOATING_PLAYER_GAP,
) {
  let position = clampFloatingPosition(rawPosition, size, viewport, margin);
  let collided = false;

  for (let pass = 0; pass < 3; pass += 1) {
    const currentRect = floatingRect(position, size);
    const collision = reservedRects.find((rect) =>
      floatingRectsOverlap(currentRect, rect, gap),
    );
    if (!collision) break;
    collided = true;
    const candidates = [
      { x: collision.x - size.width - gap, y: position.y },
      { x: collision.x + collision.width + gap, y: position.y },
      { x: position.x, y: collision.y - size.height - gap },
      { x: position.x, y: collision.y + collision.height + gap },
    ].map((candidate) => clampFloatingPosition(candidate, size, viewport, margin));

    candidates.sort((left, right) => {
      const leftRect = floatingRect(left, size);
      const rightRect = floatingRect(right, size);
      const leftPenalty = reservedRects.reduce(
        (total, reserved) => total + overlapArea(leftRect, reserved),
        0,
      );
      const rightPenalty = reservedRects.reduce(
        (total, reserved) => total + overlapArea(rightRect, reserved),
        0,
      );
      return leftPenalty - rightPenalty || distanceSquared(left, position) - distanceSquared(right, position);
    });
    position = candidates[0] ?? position;
  }

  return { position, collided };
}

export function getDesktopReservedRects(
  viewport: FloatingViewport,
  options: {
    timelineVisible?: boolean;
    stageVisible?: boolean;
    sideRailsVisible?: boolean;
  } = {},
): FloatingRect[] {
  const width = Math.max(1, viewport.width);
  const height = Math.max(1, viewport.height);
  const result: FloatingRect[] = [];
  if (options.sideRailsVisible !== false && width >= 1_100) {
    result.push(
      { x: 27, y: 18, width: Math.max(1, width - 54), height: 58 },
      { x: 27, y: 82, width: 346, height: Math.max(80, height - 190) },
      { x: Math.max(0, width - 347), y: 82, width: 320, height: Math.max(80, height - 190) },
      { x: (width - 180) / 2, y: 70, width: 180, height: 54 },
    );
  }
  if (options.timelineVisible !== false) {
    result.push({ x: 27, y: Math.max(0, height - 98), width: Math.max(1, width - 54), height: 80 });
  }
  if (options.stageVisible !== false && width >= 1_100) {
    const stageWidth = Math.min(700, Math.max(280, width - 760));
    result.push({
      x: (width - stageWidth) / 2,
      y: Math.max(100, height - 224),
      width: stageWidth,
      height: 112,
    });
  }
  return result;
}

export function snapFloatingPosition(
  rawPosition: FloatingPoint,
  size: FloatingSize,
  viewport: FloatingViewport,
  options: {
    threshold?: number;
    margin?: number;
    reducedMotion?: boolean;
  } = {},
): FloatingPlacement {
  const margin = options.margin ?? FLOATING_PLAYER_MARGIN;
  const threshold = Math.max(0, options.threshold ?? 54);
  const position = clampFloatingPosition(rawPosition, size, viewport, margin);
  const centerX = (viewport.width - size.width) / 2;
  const centerY = (viewport.height - size.height) / 2;
  const bottomY = viewport.height - size.height - margin;
  const rightX = viewport.width - size.width - margin;
  const candidates: Array<{ region: FloatingSnapRegion; point: FloatingPoint }> = [
    { region: "top-left", point: { x: margin, y: margin } },
    { region: "top-right", point: { x: rightX, y: margin } },
    { region: "bottom-left", point: { x: margin, y: bottomY } },
    { region: "bottom-right", point: { x: rightX, y: bottomY } },
    { region: "center-left", point: { x: margin, y: centerY } },
    { region: "center-right", point: { x: rightX, y: centerY } },
    { region: "top-center", point: { x: centerX, y: margin } },
    { region: "bottom-center", point: { x: centerX, y: bottomY } },
  ];
  candidates.sort(
    (left, right) => distanceSquared(left.point, position) - distanceSquared(right.point, position),
  );
  const nearest = candidates[0];
  const shouldSnap = nearest && Math.sqrt(distanceSquared(nearest.point, position)) <= threshold;
  return {
    position: shouldSnap
      ? clampFloatingPosition(nearest.point, size, viewport, margin)
      : position,
    snapRegion: shouldSnap ? nearest.region : "none",
    collided: false,
    motion: options.reducedMotion ? "instant" : "smooth",
  };
}

export function finalizeFloatingPlacement(input: {
  position: FloatingPoint;
  size: FloatingSize;
  viewport: FloatingViewport;
  reservedRects?: FloatingRect[];
  reducedMotion?: boolean;
  snap?: boolean;
}) {
  const snapped = input.snap === false
    ? {
        position: clampFloatingPosition(input.position, input.size, input.viewport),
        snapRegion: "none" as const,
        collided: false,
        motion: input.reducedMotion ? ("instant" as const) : ("smooth" as const),
      }
    : snapFloatingPosition(input.position, input.size, input.viewport, {
        reducedMotion: input.reducedMotion,
      });
  const resolved = resolveFloatingCollisions(
    snapped.position,
    input.size,
    input.viewport,
    input.reservedRects ?? [],
  );
  return {
    ...snapped,
    position: resolved.position,
    collided: resolved.collided,
  } satisfies FloatingPlacement;
}
