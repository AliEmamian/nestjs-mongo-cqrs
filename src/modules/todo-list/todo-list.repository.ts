import { AbstractRepository } from '../../modules/database/abstract.repository';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, UpdateQuery } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { TodoList } from '../../schemas/todo-list.schema';

@Injectable()
export class TodoListRepository extends AbstractRepository<TodoList> {
  protected readonly logger = new Logger(TodoListRepository.name);

  constructor(
    @InjectModel(TodoList.name) todoListModel: Model<TodoList>,
    @InjectConnection() connection: Connection,
  ) {
    super(todoListModel, connection);
  }

  public async createTodoList(todoList): Promise<TodoList> {
    return this.create(todoList.createTodoListDto);
  }

  public async findOneTodoList(param: Partial<TodoList>): Promise<TodoList> {
    return this.findOne(param);
  }

  public async updateTodoList(
    _id: string,
    param: UpdateQuery<Partial<TodoList>>,
  ): Promise<TodoList> {
    return this.findOneAndUpdate({ _id }, param);
  }
}
