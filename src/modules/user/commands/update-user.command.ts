import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly username: string,
    public readonly id: string,
    public readonly todoLists: string[],
  ) {}
}
