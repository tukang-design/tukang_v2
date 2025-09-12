import { NextResponse } from "next/server";

// Simple in-memory rate limiter (per deployment instance)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20; // requests per window per IP per route
const rateStore = new Map(); // key: ip+path, value: array of timestamps

function getClientIp(req) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  // @ts-expect-error - next/server provides ip in some runtimes
  return req.ip || "127.0.0.1";
}

function isRateLimited(req) {
  const url = new URL(req.url);
  const rateLimitedPaths = [
    "/api/contact",
    "/api/submit-quote",
    "/api/send-notification",
    "/api/booking",
    "/api/booking/submit",
  ];
  if (!rateLimitedPaths.includes(url.pathname)) return false;

  const ip = getClientIp(req);
  const key = `${ip}:${url.pathname}`;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const arr = rateStore.get(key) || [];
  const recent = arr.filter((t) => t > windowStart);
  recent.push(now);
  rateStore.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function unauthorizedBasic() {
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

function checkAdminAuth(req) {
  const header = req.headers.get("authorization") || "";
  const bearer = process.env.ADMIN_BEARER_TOKEN || "";
  const user = process.env.ADMIN_USERNAME || "";
  const pass = process.env.ADMIN_PASSWORD || "";

  if (header.startsWith("Bearer ")) {
    const token = header.slice(7);
    return bearer && token === bearer;
  }

  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const [u, p] = decoded.split(":");
      return !!user && !!pass && u === user && p === pass;
    } catch {
      return false;
    }
  }

  return false;
}

export function middleware(request) {
  const { pathname } = new URL(request.url);

  // Rate limit selected public API routes
  if (isRateLimited(request)) {
    return new Response("Too Many Requests", { status: 429 });
  }

  // Protect admin pages and APIs (and follow-up task route)
  const needsAdmin =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/follow-up");

  if (needsAdmin) {
    if (!checkAdminAuth(request)) {
      return unauthorizedBasic();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/follow-up",
    "/api/contact",
    "/api/submit-quote",
    "/api/send-notification",
    "/api/booking",
    "/api/booking/submit",
  ],
};
