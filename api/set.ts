// api/increment-download.ts
import { createClient } from "redis";

const redis = createClient({
 url: process.env.REDIS_URL,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await redis.connect();

    const newCount = await redis.incr("downloads");

    await redis.disconnect();

    res.status(200).json({ count: newCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to increment" });
  }
}
