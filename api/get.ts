import { createClient } from "redis";

const redis = createClient({
 url: process.env.REDIS_URL,
});

export default async function handler(req, res) {
  try {
    await redis.connect();

    const value = await redis.get("downloads");
    const count = value ? parseInt(value) : 0;

    await redis.disconnect();

    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ count: 0 });
  }
}
