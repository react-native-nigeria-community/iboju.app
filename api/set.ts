// api/set.ts
import { createClient } from "redis";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const redis = createClient({
    url: process.env.REDIS_URL!,
  });

  await redis.connect();

  const raw = await redis.get("downloads");
  const count = raw ? parseInt(raw.toString(), 10) : 0;

  const newCount = count + 1;

  await redis.set("downloads", newCount.toString());

  return new Response(JSON.stringify({ count: newCount }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
