import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTodoListUserQuery } from './get-todo-list-user.query';
import { TodoListRepository } from '../todo-list.repository';
import { TodoList } from '@schemas/todo-list.schema';

@QueryHandler(GetTodoListUserQuery)
export class GetTodoListUserHandler
  implements IQueryHandler<GetTodoListUserQuery>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(query: GetTodoListUserQuery): Promise<TodoList[] | null> {
    const { userId } = query;
    return await this.todoListRepository.find({
      userId: userId,
    });
  }
}
