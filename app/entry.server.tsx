import { isbot } from "isbot";
import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext
) {
  let didError = false;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const body = await renderToReadableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        signal: controller.signal,
        onError(error: unknown) {
          didError = true;
          console.error(error);
        },
      }
    );

    const userAgent = request.headers.get("user-agent") ?? "";
    if (isbot(userAgent)) {
      await body.allReady;
    }

    responseHeaders.set("Content-Type", "text/html");

    return new Response(body, {
      headers: responseHeaders,
      status: didError ? 500 : responseStatusCode,
    });
  } finally {
    clearTimeout(timeout);
  }
}
