import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { EnvironmentEnv } from '../shared/models/enums/app.enum';

const keepaliveTimeOut = parseInt(process.env.KEEPALIVE_TIMEOUT_MS); // Keep connection idle for 20 seconds
const nodeEnv = process.env.NODE_ENV;
const port = process.env.PORT;
const ip = process.env.IP;

let url = process.env.URL ?? `${ip}:${port}`;
url = process.env.PROTOCOL + '://' + url;

export const appConfig = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      whitelist: true,
    }),
  );

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.setGlobalPrefix('api');
};

export const server = {
  production: nodeEnv === EnvironmentEnv.PRODUCTION,
  keepaliveTimeOut,
  port,
  url,
  ip,
};
