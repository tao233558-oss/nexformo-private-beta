import { createContext, useCallback, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, ExternalLink, LoaderCircle, LockKeyhole, ShieldCheck, X } from "lucide-react";

type BetaStatus = {
  enabled: boolean;
  available: boolean;
  authenticated: boolean;
};

type PrivateBetaContextValue = {
  enabled: boolean;
  openDisclosure: () => void;
  logout: () => Promise<void>;
};

const PrivateBetaContext = createContext<PrivateBetaContextValue>({
  enabled: false,
  openDisclosure: () => undefined,
  logout: async () => undefined,
});

export const usePrivateBeta = () => useContext(PrivateBetaContext);

const readResponseMessage = async (response: Response, fallback: string) => {
  try {
    const payload = (await response.json()) as { error?: unknown };
    return typeof payload.error === "string" && payload.error.trim()
      ? payload.error.trim().slice(0, 240)
      : fallback;
  } catch {
    return fallback;
  }
};

function DisclosureDialog({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/82 px-6 backdrop-blur-md" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="max-h-[82vh] w-[min(680px,92vw)] overflow-y-auto border border-white/16 bg-[#050505] p-7 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="beta-disclosure-title">
        <div className="flex items-start justify-between gap-8 border-b border-white/10 pb-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/32">Nexformo / Private Beta</p>
            <h2 id="beta-disclosure-title" className="mt-3 text-2xl font-light text-white/88">测试说明与隐私提示</h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/14 text-white/42 transition hover:border-white/45 hover:text-white" aria-label="关闭测试说明"><X size={13} /></button>
        </div>

        <div className="space-y-5 py-6 text-[12px] font-light leading-7 text-white/58">
          <p>这是仅供受邀者体验的实验性私测版本。Sol 的回复、情绪判断、联网结果、歌词匹配和语音能力都可能出错，也不代表专业意见。</p>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/72">数据如何流动</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>你主动发送的文字会交给已配置的 AI 服务处理；需要实时信息时，服务端可能执行联网搜索。</li>
              <li>只有你点击语音按钮后才会请求麦克风权限。录音或待朗读文本可能发送给已配置的豆包或 OpenAI 语音服务；本站不把原始录音写入浏览器存储。</li>
              <li>音乐搜索由服务器调用 YouTube Data API；播放始终发生在可见的官方 YouTube 嵌入播放器中，并受 YouTube 自身条款与隐私政策约束。</li>
              <li>歌词由 LRCLIB 查询，可能缺失或匹配不准。外部来源链接只会在你主动点击后打开。</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/72">本机保存</p>
            <p className="mt-2">世界、界面偏好、有限的情绪连续性与经你确认的记忆保存在当前浏览器的 localStorage。可在站内使用重置/清除控件，或清除该站点的浏览器数据来删除。</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/72">请不要输入</p>
            <p className="mt-2">密码、银行卡信息、身份证件、私密账号凭据，以及需要保密的医疗、法律、工作或个人资料。服务器可能保留必要的技术错误日志用于排查，但不应记录你的邀请码或 API 密钥。</p>
          </div>
          <p className="border-l border-white/18 pl-4 text-white/42">继续体验即表示你理解这是一个小范围实验版本，并愿意自行判断 AI 与第三方服务返回的内容。</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[9px] text-white/34 transition hover:text-white/70">YouTube / Google 隐私政策 <ExternalLink size={10} /></a>
          <button type="button" onClick={onClose} className="border border-white/28 px-5 py-2.5 text-[10px] text-white/78 transition hover:bg-white hover:text-black">我已了解</button>
        </div>
      </section>
    </div>
  );
}

function LoadingScreen({ error, onRetry, onDisclosure }: { error: string; onRetry: () => void; onDisclosure: () => void }) {
  return (
    <main className="flex h-full w-full items-center justify-center bg-black text-white">
      <div className="w-[420px] text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/15">
          {error ? <LockKeyhole size={15} className="text-white/52" /> : <LoaderCircle size={15} className="animate-spin text-white/52" />}
        </div>
        <p className="mt-5 text-[9px] uppercase tracking-[0.22em] text-white/32">Nexformo / Private Beta</p>
        <p className="mt-3 text-sm font-light text-white/58" role="status">{error || "正在确认私测访问状态…"}</p>
        <div className="mt-6 flex items-center justify-center gap-5">
          {error && <button type="button" onClick={onRetry} className="text-[10px] text-white/62 underline decoration-white/25 underline-offset-4 hover:text-white">重新连接</button>}
          <button type="button" onClick={onDisclosure} className="text-[10px] text-white/38 underline decoration-white/18 underline-offset-4 hover:text-white/75">测试说明与隐私</button>
        </div>
      </div>
    </main>
  );
}

function AccessScreen({ available, onGranted, onDisclosure }: { available: boolean; onGranted: () => void; onDisclosure: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!code.trim() || busy || !available) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/beta/access", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      if (!response.ok) throw new Error(await readResponseMessage(response, "邀请码验证失败，请稍后重试。"));
      setCode("");
      onGranted();
    } catch (candidate) {
      setError(candidate instanceof Error ? candidate.message : "邀请码验证失败，请稍后重试。");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative flex h-full min-w-[900px] items-center justify-center overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_50%_42%,rgba(244,163,199,0.12),transparent_34%)]" />
      <section className="relative w-[480px] border border-white/12 bg-black/72 p-9 shadow-2xl backdrop-blur-xl" aria-labelledby="beta-access-title">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16"><ShieldCheck size={15} className="text-white/62" /></div>
          <button type="button" onClick={onDisclosure} className="text-[9px] tracking-[0.08em] text-white/35 transition hover:text-white/72">测试说明与隐私</button>
        </div>
        <p className="mt-10 text-[9px] uppercase tracking-[0.24em] text-white/30">Nexformo / Invited Preview</p>
        <h1 id="beta-access-title" className="mt-4 text-4xl font-light tracking-[-0.025em]">进入 Sol 的私测世界</h1>
        <p className="mt-5 max-w-sm text-[12px] font-light leading-7 text-white/46">当前版本仅向受邀测试者开放。邀请码只用于建立浏览器会话，不会写入页面存储。</p>

        <form onSubmit={submit} className="mt-8">
          <label htmlFor="beta-access-code" className="text-[9px] uppercase tracking-[0.18em] text-white/36">私测邀请码</label>
          <div className="mt-3 flex items-center border-b border-white/25 pb-2 focus-within:border-white/70">
            <input id="beta-access-code" value={code} onChange={(event) => setCode(event.target.value.slice(0, 256))} disabled={busy || !available} autoComplete="one-time-code" autoFocus type="password" className="min-w-0 flex-1 bg-transparent py-2 text-base font-light tracking-[0.12em] text-white outline-none placeholder:text-white/20" placeholder="输入邀请码" />
            <button type="submit" disabled={!code.trim() || busy || !available} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/70 transition hover:border-white hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-25" aria-label="验证邀请码">{busy ? <LoaderCircle size={13} className="animate-spin" /> : <ArrowRight size={13} />}</button>
          </div>
        </form>
        {!available && <p className="mt-5 text-[10px] leading-5 text-amber-100/52" role="alert">私测入口暂时不可用，请联系邀请人检查服务器配置。</p>}
        {error && <p className="mt-5 text-[10px] leading-5 text-rose-100/62" role="alert">{error}</p>}
        <p className="mt-9 border-t border-white/8 pt-5 text-[9px] leading-5 text-white/25">请勿在测试对话中输入密码、支付信息或其他敏感资料。</p>
      </section>
    </main>
  );
}

export default function PrivateBetaGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<BetaStatus | null>(null);
  const [statusError, setStatusError] = useState("");
  const [disclosureOpen, setDisclosureOpen] = useState(false);
  const [statusAttempt, setStatusAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8_000);
    setStatusError("");
    void fetch("/api/beta/status", { credentials: "same-origin", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("无法确认私测访问状态。");
        const payload = (await response.json()) as Partial<BetaStatus>;
        setStatus({
          enabled: payload.enabled === true,
          available: payload.available !== false,
          authenticated: payload.authenticated === true,
        });
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatusError("无法连接私测入口，请检查网络后重试。");
        else setStatusError("私测入口响应超时，请稍后重试。");
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [statusAttempt]);

  useEffect(() => {
    if (!status?.enabled || !status.authenticated) return;
    let disposed = false;
    const revalidate = async () => {
      try {
        const response = await fetch("/api/beta/status", { credentials: "same-origin" });
        if (!response.ok) return;
        const payload = (await response.json()) as Partial<BetaStatus>;
        if (!disposed && payload.authenticated !== true) {
          setStatus((current) => current ? { ...current, authenticated: false } : current);
        }
      } catch {
        // A temporary network outage should not discard a still-valid local session.
      }
    };
    const handleFocus = () => void revalidate();
    const interval = window.setInterval(() => void revalidate(), 5 * 60_000);
    window.addEventListener("focus", handleFocus);
    return () => {
      disposed = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [status?.authenticated, status?.enabled]);

  const logout = useCallback(async () => {
    await fetch("/api/beta/logout", { method: "POST", credentials: "same-origin" }).catch(() => undefined);
    setStatus((current) => current ? { ...current, authenticated: !current.enabled } : current);
  }, []);

  const contextValue = useMemo<PrivateBetaContextValue>(() => ({
    enabled: status?.enabled === true,
    openDisclosure: () => setDisclosureOpen(true),
    logout,
  }), [logout, status?.enabled]);

  const gateContent = !status || statusError
    ? <LoadingScreen error={statusError} onRetry={() => setStatusAttempt((value) => value + 1)} onDisclosure={() => setDisclosureOpen(true)} />
    : status.enabled && !status.authenticated
      ? <AccessScreen available={status.available} onGranted={() => setStatus((current) => current ? { ...current, authenticated: true } : current)} onDisclosure={() => setDisclosureOpen(true)} />
      : children;

  return (
    <PrivateBetaContext.Provider value={contextValue}>
      {gateContent}
      {disclosureOpen && <DisclosureDialog onClose={() => setDisclosureOpen(false)} />}
    </PrivateBetaContext.Provider>
  );
}
