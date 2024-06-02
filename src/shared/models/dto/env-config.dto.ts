import {
  IsOptional,
  IsDefined,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { EnvironmentEnv } from '../enums/app.enum';

export class EnvConfigDto {
  @IsOptional()
  @IsString()
  readonly TZ?: string;

  @IsDefined()
  @IsEnum(EnvironmentEnv)
  @Transform((param) => param.value.toLowerCase())
  readonly NODE_ENV?: EnvironmentEnv;

  @IsDefined()
  @IsNumber()
  readonly KEEPALIVE_TIMEOUT_MS: number;

  @IsDefined()
  @IsString()
  readonly MONGODB_URI: string;

  @IsDefined()
  @IsString()
  readonly AT_SECRET: string;

  @IsDefined()
  @IsString()
  readonly RT_SECRET: string;

  @IsDefined()
  @IsString()
  readonly IP: string;

  @IsDefined()
  @IsNumber()
  readonly PORT: number;

  @IsDefined()
  @IsString()
  readonly URL: string;

  @IsDefined()
  @IsString()
  readonly PROTOCOL: string;
}
