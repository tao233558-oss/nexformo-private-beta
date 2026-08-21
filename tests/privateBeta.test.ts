import assert from "node:assert/strict";
import test from "node:test";
import {
  BETA_COOKIE_NAME,
  constantTimeTextEqual,
  createExpiredPrivateBetaCookie,
  createPrivateBetaCookie,
  createPrivateBetaSession,
  hasValidPrivateBetaSession,
  isRequestOriginAllowed,
  productionContentSecurityPolicy,
  resolvePrivateBetaConfig,
  verifyPrivateBetaSession,
} from "../serverSecurity";

const TEST_SECRET = "test-only-session-secret-with-at-least-32-characters";

test("private beta stays disabled when no access code is configured", () => {
  const config = resolvePrivateBetaConfig({}, false);
  assert.equal(config.enabled, false);
  assert.equal(config.configured, true);
  assert.equal(hasValidPrivateBetaSession(undefined, config), true);
});

test("private beta fails closed when a configured gate has no strong session secret", () => {
  const config = resolvePrivateBetaConfig({ BETA_ACCESS_CODE: "invite", BETA_SESSION_SECRET: "short" }, true);
  assert.equal(config.enabled, true);
  assert.equal(config.configured, false);
  assert.equal(hasValidPrivateBetaSession(undefined, config), false);
});

test("production cookies are Secure except on an explicit local validation origin", () => {
  const publicConfig = resolvePrivateBetaConfig({
    BETA_ACCESS_CODE: "invite",
    BETA_SESSION_SECRET: TEST_SECRET,
    PUBLIC_ORIGIN: "https://beta.example.com",
  }, true);
  const loopbackConfig = resolvePrivateBetaConfig({
    BETA_ACCESS_CODE: "invite",
    BETA_SESSION_SECRET: TEST_SECRET,
    PUBLIC_ORIGIN: "http://localhost:4173",
  }, true);
  assert.equal(publicConfig.secureCookie, true);
  assert.equal(loopbackConfig.secureCookie, false);
});

test("signed beta sessions validate, expire, and reject tampering", () => {
  const now = 1_800_000_000_000;
  const token = createPrivateBetaSession(TEST_SECRET, now, 3_600);
  assert.equal(verifyPrivateBetaSession(token, TEST_SECRET, now + 2_000), true);
  assert.equal(verifyPrivateBetaSession(`${token}x`, TEST_SECRET, now + 2_000), false);
  assert.equal(verifyPrivateBetaSession(token, `${TEST_SECRET}-other`, now + 2_000), false);
  assert.equal(verifyPrivateBetaSession(token, TEST_SECRET, now + 3_601_000), false);
});

test("beta session cookies are HttpOnly, same-site, bounded, and clearable", () => {
  const token = createPrivateBetaSession(TEST_SECRET, 1_800_000_000_000);
  const cookie = createPrivateBetaCookie(token, true);
  assert.match(cookie, new RegExp(`^${BETA_COOKIE_NAME}=`));
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Lax/);
  assert.match(cookie, /Secure/);
  assert.match(cookie, /Max-Age=604800/);
  assert.match(createExpiredPrivateBetaCookie(false), /Max-Age=0/);
});

test("beta access comparison is stable for equal, unequal, and differently sized values", () => {
  assert.equal(constantTimeTextEqual("invite-code", "invite-code"), true);
  assert.equal(constantTimeTextEqual("invite-code", "wrong-code"), false);
  assert.equal(constantTimeTextEqual("a", "a much longer value"), false);
});

test("production unsafe requests require the configured same origin", () => {
  const base = {
    method: "POST",
    publicOrigin: "https://beta.example.com",
    host: "internal:3000",
    production: true,
  };
  assert.equal(isRequestOriginAllowed({ ...base, origin: "https://beta.example.com" }), true);
  assert.equal(isRequestOriginAllowed({ ...base, origin: "https://attacker.example" }), false);
  assert.equal(isRequestOriginAllowed(base), false);
  assert.equal(isRequestOriginAllowed({ ...base, method: "GET", origin: "https://attacker.example" }), true);
});

test("origin validation can derive a proxied HTTPS origin when PUBLIC_ORIGIN is absent", () => {
  assert.equal(isRequestOriginAllowed({
    method: "POST",
    origin: "https://beta.example.com",
    host: "beta.example.com",
    forwardedProto: "https",
    production: true,
  }), true);
});

test("production CSP permits the official YouTube embed without unsafe script execution", () => {
  const policy = productionContentSecurityPolicy();
  assert.match(policy, /script-src 'self' https:\/\/www\.youtube\.com/);
  assert.match(policy, /frame-src https:\/\/www\.youtube\.com/);
  assert.doesNotMatch(policy, /unsafe-eval/);
  assert.doesNotMatch(policy, /script-src[^;]*\*/);
});
