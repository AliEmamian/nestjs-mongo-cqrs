import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { NestFactory } from '@nestjs/core';
import chalk from 'chalk';
import { server, appConfig } from '@config/server.config';
import { AppModule } from './app.module';
import { configureSwagger } from '@config/swagger.config';
import morganConfig from '@config/morgan.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appConfig(app);
  configureSwagger(app);
  morganConfig(app);

  await app.listen(server.port, server.ip);
}

bootstrap()
  .then(() => {
    const http = `\n${chalk.bgGray(
      chalk.bgGray.white(' 🇭 🇹 🇹 🇵   Listening on: '),
    )} ${server.ip}:${server.port} => ${chalk.magenta(server.url)}`;

    console.log(chalk.magenta.italic.bold(http));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
