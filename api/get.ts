// api/get.ts
import { createClient } from "redis";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const redis = createClient({
    url: process.env.REDIS_URL!,
  });

  await redis.connect();

  const raw = await redis.get("downloads"); // string | Buffer | null
  const count = raw ? parseInt(raw.toString(), 10) : 0;

  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
