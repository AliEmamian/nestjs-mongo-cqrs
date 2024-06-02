import { Routes } from '@nestjs/core';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { UserModule } from './modules/user/user.module';
import { TodoListModule } from './modules/todo-list/todo-list.module';
import { TodoItemModule } from './modules/todo-item/todo-item.module';

export default [
  {
    path: '/heartbeat',
    module: HealthCheckModule,
  },
  {
    path: '/user',
    module: UserModule,
  },
  {
    path: '/todo-list',
    module: TodoListModule,
  },
  {
    path: '/todo-item',
    module: TodoItemModule,
  },
] as Routes;
