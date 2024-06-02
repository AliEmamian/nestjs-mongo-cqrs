import { Module } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { JwtModule } from '@nestjs/jwt';
import { TodoItem, TodoItemSchema } from '../../schemas/todo-item.schema';
import { TodoItemController } from './todo-item.controller';
import { TodoItemRepository } from './todo-item.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoItemHandler } from './commands/create-todo-item-handler';
import { TodoListModule } from '../../modules/todo-list/todo-list.module';
import { UpdateTodoItemHandler } from './commands/update-todo-item.handler';
import { GetTodoItemByIdHandler } from './queries/get-todo-item-by-id.handler';
import { GetItemsTodoListHandler } from './queries/get-items-todo-list.handler';
import { RemoveTodoItemHandler } from './commands/remove-todo-item.handler';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: TodoItem.name, schema: TodoItemSchema },
    ]),
    CqrsModule,
    TodoListModule,
  ],
  controllers: [TodoItemController],
  providers: [
    TodoItemRepository,
    TodoItemService,
    CreateTodoItemHandler,
    UpdateTodoItemHandler,
    GetTodoItemByIdHandler,
    GetItemsTodoListHandler,
    RemoveTodoItemHandler,
  ],
  exports: [TodoItemService],
})
export class TodoItemModule {}
