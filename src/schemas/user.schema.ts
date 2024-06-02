import { AbstractDocument } from '../modules/database/abstract.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop({ name: 'username', type: String })
  username: string;

  @Prop({ name: 'hash', type: String, required: true })
  public hash: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TodoList' }] })
  todoLists: string[];
}

export const userSchema = SchemaFactory.createForClass(User);
