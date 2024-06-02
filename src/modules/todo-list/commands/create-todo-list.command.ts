import { ICommand } from '@nestjs/cqrs';
import { CreateTodoListDto } from '../dto/create-todo-list.dto';

export class CreateTodoListCommand implements ICommand {
  constructor(public readonly createTodoListDto: CreateTodoListDto) {}
}
