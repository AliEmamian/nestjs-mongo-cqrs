import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from './update-todo-list.command';
import { TodoListRepository } from '../todo-list.repository';
import { TodoList } from '@schemas/todo-list.schema';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(command: UpdateTodoListCommand): Promise<TodoList> {
    const { id, title, todoItems } = command;
    if (todoItems)
      return this.todoListRepository.updateTodoList(id, { title, todoItems });
    return this.todoListRepository.updateTodoList(id, { title });
  }
}
