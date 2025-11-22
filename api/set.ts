import { createClient } from "redis";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
  const redis = createClient({
    url: process.env.REDIS_URL!,
  });

  await redis.connect();

  const raw = await redis.get("downloads");
  const prev = raw ? parseInt(raw.toString(), 10) : 0;
  const newCount = prev + 1;

  await redis.set("downloads", newCount.toString());
  await redis.disconnect();

  res.status(200).json({ count: newCount });
}
