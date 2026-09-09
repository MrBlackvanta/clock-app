import type { Place } from "../src/lib/place";

type Env = {
  ASSETS: Fetcher;
  PLACE_LIMIT: RateLimit;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function withinQuota(request: Request, env: Env) {
  const key = request.headers.get("CF-Connecting-IP") ?? "anonymous";
  const { success } = await env.PLACE_LIMIT.limit({ key });
  return success;
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname !== "/api/place") return env.ASSETS.fetch(request);
    if (request.method !== "GET") {
      return json({ error: "Method not allowed." }, 405);
    }

    if (!(await withinQuota(request, env))) {
      return json({ error: "Too many requests. Try again shortly." }, 429);
    }

    const place: Place = {
      city: request.cf?.city ?? "",
      country: request.cf?.country ?? "",
    };

    return json(place);
  },
} satisfies ExportedHandler<Env>;
