import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "redis";

let cached: any = null;

// 🔄 Reuse Redis connection across calls (important on Vercel)
async function getRedis() {
  if (cached) return cached;

  const redis = createClient({
    url: process.env.REDIS_URL,
  });

  redis.on("error", (err) => console.error("Redis Client Error", err));

  await redis.connect();
  cached = redis;
  return redis;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const redis = await getRedis();

    // amount supplied by client
    const amount = Number(req.body?.amount || 1);

    const current = Number((await redis.get("downloads")) || 0);
    const newCount = current + amount;

    await redis.set("downloads", newCount);

    return res.status(200).json({ count: newCount });
  } catch (err) {
    console.error("SET API Error:", err);
    return res.status(500).json({ error: "Failed to update counter" });
  }
}
