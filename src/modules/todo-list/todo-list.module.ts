import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { JwtModule } from '@nestjs/jwt';
import { TodoList, TodoListSchema } from '../../schemas/todo-list.schema';
import { TodoListController } from './todo-list.controller';
import { TodoListRepository } from './todo-list.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoListHandler } from './commands/create-todo-list-handler';
import { UserModule } from '../../modules/user/user.module';
import { GetTodoListUserHandler } from './queries/get-todo-list-user.handler';
import { UpdateTodoListHandler } from './commands/update-todo-list.handler';
import { GetTodoListByIdHandler } from './queries/get-todo-list-by-id.handler';
import { RemoveTodoListHandler } from './commands/remove-todo-list.handler';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
    ]),
    CqrsModule,
    UserModule,
    // forwardRef(() => TodoItemModule),
  ],
  controllers: [TodoListController],
  providers: [
    TodoListRepository,
    TodoListService,
    CreateTodoListHandler,
    GetTodoListUserHandler,
    UpdateTodoListHandler,
    GetTodoListByIdHandler,
    RemoveTodoListHandler,
  ],
  exports: [TodoListService],
})
export class TodoListModule {}
