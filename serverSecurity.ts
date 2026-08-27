import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const BETA_COOKIE_NAME = "nexformo_beta";
export const BETA_SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

export type PrivateBetaConfig = {
  enabled: boolean;
  configured: boolean;
  accessCode: string;
  sessionSecret: string;
  publicOrigin: string;
  secureCookie: boolean;
};

const normalizeOrigin = (value: string) => {
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
};

export function resolvePrivateBetaConfig(
  environment: NodeJS.ProcessEnv,
  production: boolean,
): PrivateBetaConfig {
  const accessCode = environment.BETA_ACCESS_CODE?.trim() ?? "";
  const sessionSecret = environment.BETA_SESSION_SECRET?.trim() ?? "";
  const publicOrigin = normalizeOrigin(environment.PUBLIC_ORIGIN?.trim() ?? "");
  const enabled = Boolean(accessCode);
  const explicitLoopbackOrigin = /^http:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(publicOrigin);
  return {
    enabled,
    configured: !enabled || sessionSecret.length >= 32,
    accessCode,
    sessionSecret,
    publicOrigin,
    // Public production deployments must use HTTPS. The sole exception keeps a
    // production build testable on an explicit loopback origin.
    secureCookie: production && !explicitLoopbackOrigin,
  };
}

const digestText = (value: string) => createHash("sha256").update(value).digest();

export function constantTimeTextEqual(left: string, right: string) {
  return timingSafeEqual(digestText(left), digestText(right));
}

const signSession = (payload: string, secret: string) =>
  createHmac("sha256", secret).update(payload).digest("base64url");

export function createPrivateBetaSession(
  secret: string,
  now = Date.now(),
  ttlSeconds = BETA_SESSION_TTL_SECONDS,
) {
  const expiresAt = Math.floor(now / 1_000) + Math.max(60, Math.floor(ttlSeconds));
  const payload = `v1.${expiresAt}`;
  return `${payload}.${signSession(payload, secret)}`;
}

export function verifyPrivateBetaSession(token: string, secret: string, now = Date.now()) {
  if (!secret || token.length > 512) return false;
  const match = token.match(/^v1\.(\d{10,12})\.([A-Za-z0-9_-]{40,64})$/);
  if (!match) return false;
  const expiresAt = Number(match[1]);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(now / 1_000)) return false;
  const payload = `v1.${expiresAt}`;
  return constantTimeTextEqual(match[2], signSession(payload, secret));
}

export function parseCookieHeader(header: string | undefined) {
  const cookies = new Map<string, string>();
  for (const part of (header ?? "").split(";")) {
    const separator = part.indexOf("=");
    if (separator <= 0) continue;
    const name = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    if (name && !cookies.has(name)) cookies.set(name, value);
  }
  return cookies;
}

export function hasValidPrivateBetaSession(
  cookieHeader: string | undefined,
  config: PrivateBetaConfig,
  now = Date.now(),
) {
  if (!config.enabled) return true;
  if (!config.configured) return false;
  const token = parseCookieHeader(cookieHeader).get(BETA_COOKIE_NAME) ?? "";
  return verifyPrivateBetaSession(token, config.sessionSecret, now);
}

export function createPrivateBetaCookie(token: string, secure: boolean) {
  return [
    `${BETA_COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${BETA_SESSION_TTL_SECONDS}`,
    ...(secure ? ["Secure"] : []),
  ].join("; ");
}

export function createExpiredPrivateBetaCookie(secure: boolean) {
  return [
    `${BETA_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    ...(secure ? ["Secure"] : []),
  ].join("; ");
}

export function isUnsafeMethod(method: string) {
  return !["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());
}

export function isRequestOriginAllowed(input: {
  method: string;
  origin?: string;
  publicOrigin?: string;
  host?: string;
  forwardedProto?: string;
  encrypted?: boolean;
  production: boolean;
}) {
  if (!isUnsafeMethod(input.method)) return true;
  const origin = normalizeOrigin(input.origin ?? "");
  if (!origin) return !input.production;

  const configuredOrigin = normalizeOrigin(input.publicOrigin ?? "");
  if (configuredOrigin) return constantTimeTextEqual(origin, configuredOrigin);

  const host = (input.host ?? "").trim().toLowerCase();
  if (!host || /[\s/\\]/.test(host)) return false;
  const forwardedProtocol = (input.forwardedProto ?? "").split(",")[0]?.trim().toLowerCase();
  const protocol = forwardedProtocol === "https" || input.encrypted ? "https" : "http";
  return constantTimeTextEqual(origin, `${protocol}://${host}`);
}

export function productionContentSecurityPolicy() {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "script-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com https://*.ytimg.com",
    "connect-src 'self' https://www.youtube.com https://*.youtube.com https://www.googleapis.com https://lrclib.net wss: ws:",
    "frame-src https://www.youtube.com https://www.youtube-nocookie.com 'self'",
    "media-src 'self' blob: data:",
    "worker-src 'self' blob:",
  ].join("; ");
}
