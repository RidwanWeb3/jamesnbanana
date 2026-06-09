import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      // Log the REAL error with full stack trace
      const errorStackRaw = error instanceof Error ? error.stack : undefined;
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = errorStackRaw ?? "No stack trace";
      console.error("[server.ts] SSR crash:", errorMessage);
      console.error("[server.ts] Stack:", errorStack);

      // Return error page with debug info in development
      const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;
      const safeStack = errorStack.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const debugInfo = isDev
        ? `<pre style="text-align:left;max-width:600px;margin:1rem auto;padding:1rem;background:#fee;border:1px solid #fcc;border-radius:8px;font-size:12px;overflow:auto;white-space:pre-wrap;word-break:break-all"><strong>Error:</strong> ${errorMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}\n\n<strong>Stack:</strong> ${safeStack}</pre>`
        : "";

      return new Response(
        renderErrorPage() + debugInfo,
        {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        },
      );
    }
  },
};
