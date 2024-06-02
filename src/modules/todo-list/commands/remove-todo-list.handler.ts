import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveTodoListCommand } from './remove-todo-list.command';
import { TodoListRepository } from '../todo-list.repository';

@CommandHandler(RemoveTodoListCommand)
export class RemoveTodoListHandler
  implements ICommandHandler<RemoveTodoListCommand>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(command: RemoveTodoListCommand): Promise<boolean> {
    const { id } = command;
    return this.todoListRepository.removeOne(id);
  }
}
