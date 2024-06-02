import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoListRepository } from '../todo-list.repository';
import { CreateTodoListCommand } from './create-todo-list.command';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(command: CreateTodoListCommand) {
    const createdTodoList =
      await this.todoListRepository.createTodoList(command);
    return createdTodoList;
  }
}
