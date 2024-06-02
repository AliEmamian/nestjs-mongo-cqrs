import { IQuery } from '@nestjs/cqrs';

export class GetTodoListUserQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
