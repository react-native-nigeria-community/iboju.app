import { Redis } from "@upstash/redis";

export const config = { runtime: "edge" };

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function handler() {
  const count = await redis.incr("iboju_downloads");
  return new Response(JSON.stringify({ count }), {
    headers: { "content-type": "application/json" },
  });
}
