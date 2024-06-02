import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveTodoItemCommand } from './remove-todo-item.command';
import { TodoItemRepository } from '../todo-item.repository';

@CommandHandler(RemoveTodoItemCommand)
export class RemoveTodoItemHandler
  implements ICommandHandler<RemoveTodoItemCommand>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(command: RemoveTodoItemCommand): Promise<boolean> {
    const { id } = command;
    return this.todoItemRepository.removeOne(id);
  }
}
