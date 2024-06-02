import { IQuery } from '@nestjs/cqrs';

export class GetItemsTodoListQuery implements IQuery {
  constructor(public readonly todoListId: string) {}
}
