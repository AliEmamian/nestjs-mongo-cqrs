import { APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { DatabaseModule } from './modules/database/abstract.module';
import { UserModule } from './modules/user/user.module';
import { envValidate } from './config/env.validation';
import { AtGuard } from './shared/guards';
import routes from './routes';
import { TodoListModule } from './modules/todo-list/todo-list.module';
import { TodoItemModule } from './modules/todo-item/todo-item.module';

@Module({
  imports: [
    RouterModule.register(routes),
    ConfigModule.forRoot({
      isGlobal: true,
      // validate: envValidate,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule.registerAsync(process.env.MONGODB_URI),
    HealthCheckModule,
    UserModule,
    TodoListModule,
    TodoItemModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
