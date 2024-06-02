import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from './update-todo-item.command';
import { TodoItemRepository } from '../todo-item.repository';
import { TodoItem } from '@schemas/todo-item.schema';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(command: UpdateTodoItemCommand): Promise<TodoItem> {
    const { id, title, description, priority } = command;
    return this.todoItemRepository.updateTodoItem(id, {
      title,
      description,
      priority,
    });
  }
}
