import { IQuery } from '@nestjs/cqrs';

export class GetTodoListByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
