import { createRequestHandler } from "react-router";
// @ts-expect-error Generated at build time; no static .d.ts is emitted for this module.
import * as build from "../build/server/index.js";

const handleRequest = createRequestHandler(build);

type WorkerExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
};

type AssetFetcher = {
  fetch(request: Request): Promise<Response>;
};

type Env = {
  ASSETS: AssetFetcher;
};

export default {
  async fetch(request: Request, env: Env, ctx: WorkerExecutionContext) {
    const url = new URL(request.url);

    const isAsset =
      url.pathname.startsWith("/assets/") ||
      url.pathname === "/favicon.ico" ||
      url.pathname === "/robots.txt" ||
      url.pathname === "/manifest.webmanifest" ||
      url.pathname.includes(".");

    if (isAsset) {
      return env.ASSETS.fetch(request);
    }

    return handleRequest(request, { cloudflare: { env, ctx } });
  },
};
