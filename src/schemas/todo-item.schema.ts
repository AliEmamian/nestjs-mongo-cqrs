import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '../modules/database/abstract.schema';

@Schema({ versionKey: false })
export class TodoItem extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'TodoList', required: true })
  todoListId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  priority: number;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
