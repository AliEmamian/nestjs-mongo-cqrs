import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvConfigDto } from '../shared/models/dto/env-config.dto';
import chalk from 'chalk';

const removeObjectItem = (obj: Record<string, unknown>) => {
  for (const key in obj) {
    if (!Object.hasOwnProperty.call(obj, key)) {
      continue;
    }

    if (obj[key] === '') {
      delete obj[key];
    }
  }

  return obj;
};

export const envValidate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(
    EnvConfigDto,
    removeObjectItem(config),
    {
      enableImplicitConversion: true,
    },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    stopAtFirstError: true,
  });

  if (errors.length > 0) {
    const message = chalk.red.italic.bold(errors.toString());
    throw new Error(message);
  }

  return validatedConfig;
};
