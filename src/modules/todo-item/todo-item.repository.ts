import { AbstractRepository } from '../../modules/database/abstract.repository';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, UpdateQuery } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { TodoItem } from '../../schemas/todo-item.schema';

@Injectable()
export class TodoItemRepository extends AbstractRepository<TodoItem> {
  protected readonly logger = new Logger(TodoItemRepository.name);

  constructor(
    @InjectModel(TodoItem.name) todoItemModel: Model<TodoItem>,
    @InjectConnection() connection: Connection,
  ) {
    super(todoItemModel, connection);
  }

  public async createTodoItem(param): Promise<any> {
    return this.create({
      title: param.title,
      description: param.description,
      priority: param.priority,
      todoListId: param.todoListId,
    });
  }

  public async findOneTodoItem(param: Partial<TodoItem>): Promise<TodoItem> {
    return this.findOne(param);
  }

  public async updateTodoItem(
    _id: string,
    param: UpdateQuery<Partial<TodoItem>>,
  ): Promise<TodoItem> {
    return this.findOneAndUpdate({ _id }, param);
  }
}
