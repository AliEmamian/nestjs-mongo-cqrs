import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetItemsTodoListQuery } from './get-items-todo-list.query';
import { TodoItem } from '@schemas/todo-item.schema';
import { TodoItemRepository } from '../todo-item.repository';

@QueryHandler(GetItemsTodoListQuery)
export class GetItemsTodoListHandler
  implements IQueryHandler<GetItemsTodoListQuery>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(query: GetItemsTodoListQuery): Promise<TodoItem[] | null> {
    const { todoListId } = query;
    return await this.todoItemRepository.find({
      todoListId: todoListId,
    });
  }
}
