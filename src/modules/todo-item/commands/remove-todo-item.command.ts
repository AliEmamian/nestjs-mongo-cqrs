import { ICommand } from '@nestjs/cqrs';
import { Types } from 'mongoose';

export class RemoveTodoItemCommand implements ICommand {
  constructor(public readonly id: Types.ObjectId) {}
}
