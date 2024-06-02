import { HttpStatus } from '@nestjs/common';

export class ServiceResponse<T = any> {
  readonly error: string[] | null;
  readonly status: HttpStatus;
  readonly data: T | null;

  constructor(status: HttpStatus, data: T | null, error: string[] = []) {
    this.status = status;
    this.error = error;
    this.data = data;
  }
}
