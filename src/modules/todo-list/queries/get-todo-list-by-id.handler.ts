import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TodoListRepository } from '../todo-list.repository';
import { TodoList } from '@schemas/todo-list.schema';
import { GetTodoListByIdQuery } from './get-todo-list-by-id.query';
import { ObjectId } from 'mongodb';

@QueryHandler(GetTodoListByIdQuery)
export class GetTodoListByIdHandler
  implements IQueryHandler<GetTodoListByIdQuery>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(query: GetTodoListByIdQuery): Promise<TodoList | null> {
    const { id } = query;
    const _id = new ObjectId(id);
    return await this.todoListRepository.findOneTodoList({ _id });
  }
}
