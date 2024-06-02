import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TodoItemRepository } from '../todo-item.repository';
import { GetTodoItemByIdQuery } from './get-todo-item-by-id.query';
import { ObjectId } from 'mongodb';
import { TodoItem } from '@schemas/todo-item.schema';

@QueryHandler(GetTodoItemByIdQuery)
export class GetTodoItemByIdHandler
  implements IQueryHandler<GetTodoItemByIdQuery>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(query: GetTodoItemByIdQuery): Promise<TodoItem | null> {
    const { id } = query;
    const _id = new ObjectId(id);
    return await this.todoItemRepository.findOneTodoItem({ _id });
  }
}
