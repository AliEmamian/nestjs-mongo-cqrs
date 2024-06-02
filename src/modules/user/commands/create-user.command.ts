import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly username: string,
    public readonly hash: string,
    public readonly todoList: Array<string>,
  ) {}
}
