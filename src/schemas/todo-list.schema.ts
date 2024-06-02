import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { AbstractDocument } from '../modules/database/abstract.schema';

@Schema({ versionKey: false })
export class TodoList extends AbstractDocument {
  @Prop({
    name: 'user_id',
    type: SchemaTypes.ObjectId,
    required: true,
  })
  public userId: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TodoItem' }] })
  todoItems: string[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
