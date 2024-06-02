import { IQuery } from '@nestjs/cqrs';

export class GetTodoItemByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
