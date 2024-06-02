import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoItemRepository } from '../todo-item.repository';
import { CreateTodoItemCommand } from './create-todo-item.command';

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler
  implements ICommandHandler<CreateTodoItemCommand>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(command: CreateTodoItemCommand) {
    const createdTodoList =
      await this.todoItemRepository.createTodoItem(command);
    return createdTodoList;
  }
}
