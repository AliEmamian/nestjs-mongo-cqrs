import Redis from 'ioredis';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { server } from '@config/server.config';
import { redis } from '@config/redis.config';

export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly redis = new Redis(redis.port, redis.host, {
    lazyConnect: true,
  });

  async onModuleInit() {
    if (['connecting', 'ready', 'connect'].includes(this.redis.status)) {
      return; // already connected, do nothing
    }
    await this.redis.connect();
  }

  private genKey(extension: string): string {
    return `${redis.key}_${extension}`;
  }

  public async get<T = any>(extension: string): Promise<T | null> {
    if (!server.production) return null;

    const key = this.genKey(extension);
    const res = (await this.redis.get(key)) || null;
    return JSON.parse(res);
  }

  public async set(
    extension: string,
    value: any,
    ttl = redis.ttl.default,
  ): Promise<boolean> {
    const key = this.genKey(extension);
    value = JSON.stringify(value);

    const result = await this.redis.set(key, value, 'EX', ttl);
    return result === 'OK';
  }

  onModuleDestroy() {
    this.redis.disconnect();
  }
}
