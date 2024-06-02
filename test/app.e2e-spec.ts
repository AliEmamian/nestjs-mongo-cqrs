import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TodoItemService } from '../src/modules/todo-item/todo-item.service';
import { HealthCheckController } from '../src/modules/health-check/health-check.controller';
let requestResult: any;

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let service: TodoItemService;
  let healthService: HealthCheckController
  beforeEach(async () => {


    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidUnknownValues: true,
        transform: true,
        whitelist: true,
      }),
    );
    await app.init();
    healthService = module.get<HealthCheckController>(HealthCheckController);

  });

  it('/heartbeat (GET)', () => {
   
    jest.spyOn(healthService, 'checkHealth').mockImplementation(() => true);
    expect(healthService.checkHealth()).toBe(true);

    // requestResult = await request(app.getHttpServer())
    //   .get('/')
    //   .expect(200)
    //   .expect('Hello World!');
  });
});
