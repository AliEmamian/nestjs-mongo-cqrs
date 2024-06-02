import { IncomingMessage } from 'http';

export default (req: IncomingMessage) => {
  const arvanIP = req.headers['ar-real-ip'];
  const cloudflareIP = req.headers['cf-connecting-ip'];
  const xRealIP = req.headers['x-real-ip'];
  const xForwardedIP = req.headers['x-forwarded-for'];
  const remoteIP = req.connection.remoteAddress;
  const realIP = arvanIP || cloudflareIP || xRealIP || xForwardedIP || remoteIP;

  return Array.isArray(realIP) ? realIP.pop() : realIP;
};
