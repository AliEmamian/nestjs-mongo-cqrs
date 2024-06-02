const port = parseInt(process.env.REDIS_PORT);
const host = process.env.REDIS_HOST;
const key = process.env.REDIS_KEY;
const ttl = {
  default: 3 * 60,
};

export const redis = { port, host, key, ttl };
