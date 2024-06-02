import { RedisOptions, Transport } from '@nestjs/microservices';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Public } from '../../shared/decorators/public.decorator';

@ApiTags('Heartbeat')
@Controller()
export class HealthCheckController {
  constructor(
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly healthCheckService: HealthCheckService,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  public  checkHealth() {
    return true
  }
}
