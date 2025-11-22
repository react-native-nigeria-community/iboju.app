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
  const count = raw ? parseInt(raw.toString(), 10) : 0;

  await redis.disconnect();

  res.status(200).json({ count });
}
