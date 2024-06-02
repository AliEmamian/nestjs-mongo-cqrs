import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

export function transformToBoolean({ value }: TransformFnParams) {
  if (value === true || value === 'true') {
    return true;
  }
  if (value === false || value === 'false' || !value) {
    return false;
  }
  throw new BadRequestException('can not parse boolean');
}
