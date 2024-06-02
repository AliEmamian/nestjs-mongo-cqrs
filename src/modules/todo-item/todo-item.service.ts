import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from './commands/create-todo-item.command';
import { TodoItem } from '../../schemas/todo-item.schema';
import { TodoListService } from '../../modules/todo-list/todo-list.service';
import { UpdateTodoItemCommand } from './commands/update-todo-item.command';
import { GetTodoItemByIdQuery } from './queries/get-todo-item-by-id.query';
import { GetItemsTodoListQuery } from './queries/get-items-todo-list.query';
import { RemoveTodoItemCommand } from './commands/remove-todo-item.command';

@Injectable()
export class TodoItemService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly todoListService: TodoListService,
  ) {}

  async createTodoItem(dto): Promise<TodoItem> {
    const res = await this.commandBus.execute(
      new CreateTodoItemCommand(
        dto.title,
        dto.description,
        dto.priority,
        dto.todoListId,
      ),
    );
    const todoList = await this.todoListService.findById(dto.todoListId);
    todoList.todoItems.push(res._id.toString());

    await this.todoListService.updateTodoList(dto.todoListId, {
      title: todoList.title,
      todoItems: todoList.todoItems,
    });

    return res;
  }

  async updateTodoItem(id: string, dto): Promise<TodoItem> {
    return await this.commandBus.execute(
      new UpdateTodoItemCommand(id, dto.title, dto.description, dto.priority),
    );
  }

  public async findById(todoItemId: string): Promise<TodoItem> {
    return await this.queryBus.execute(new GetTodoItemByIdQuery(todoItemId));
  }

  async getTodoList(todoListId: string): Promise<TodoItem[]> {
    const res = await this.queryBus.execute(
      new GetItemsTodoListQuery(todoListId),
    );
    res.sort((a, b) => a.priority - b.priority);

    return res;
  }

  public async removeTodoItem(id): Promise<boolean> {
    let todoItem;
    try {
      todoItem = await this.findById(id);
    } catch (e) {
      throw new BadRequestException('id not exist');
    }

    const res = this.removeById(id);

    const todoList = await this.todoListService.findById(todoItem.todoListId);
    const indexToRemove = todoList.todoItems.indexOf(id);
    if (indexToRemove !== -1) {
      todoList.todoItems.splice(indexToRemove, 1);
    }
    await this.todoListService.updateTodoList(todoItem.todoListId, {
      todoItems: todoList.todoItems,
    });

    return res;
  }

  public async removeById(id) {
    return await this.commandBus.execute(new RemoveTodoItemCommand(id));
  }
}
