import { ICommand } from '@nestjs/cqrs';
import { Types } from 'mongoose';

export class RemoveTodoListCommand implements ICommand {
  constructor(public readonly id: Types.ObjectId) {}
}
