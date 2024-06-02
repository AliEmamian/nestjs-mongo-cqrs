import chalk from 'chalk';
import morgan from 'morgan';
import { createWriteStream } from 'fs';
import { INestApplication } from '@nestjs/common';
import userIpUtil from '@shared/utils/user-ip.util';

export default (app: INestApplication) => {
  const responseTime = `${chalk.italic.greenBright(':response-time')}ms`;
  const contentLength = `${chalk.italic.greenBright(
    ':res[content-length]',
  )}byte`;

  const format =
    chalk.blueBright('[:date]') +
    chalk.whiteBright.bold(' :remote-addr') +
    chalk.hex('#FFA500').bold(' :method :url ') +
    chalk.red.bold(':status ') +
    chalk.green(responseTime, contentLength) +
    chalk.gray('":user-agent"');

  // Find client's real IP address
  morgan.token('remote-addr', (req): string => userIpUtil(req));

  // Set timezone
  morgan.token('date', () =>
    chalk.cyan(
      `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`,
    ),
  );

  // Log to file if enabled
  if (process.env.LOG_PATH) {
    const accessLogStream = createWriteStream(process.env.LOG_PATH, {
      flags: 'a',
    });
    app.use(
      morgan(format, {
        skip: function (req) {
          return req.url === '/api/v1/heartbeat';
        },
        stream: accessLogStream,
      }),
    );
  }
  // Log to console
  app.use(
    morgan(format, {
      skip: function (req) {
        return req.url === '/api/v1/heartbeat';
      },
    }),
  );
};
