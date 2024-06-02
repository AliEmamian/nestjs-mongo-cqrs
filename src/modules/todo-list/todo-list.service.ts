import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './commands/create-todo-list.command';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UserService } from '../../modules/user/user.service';
import { User } from '../../schemas/user.schema';
import { GetTodoListUserQuery } from './queries/get-todo-list-user.query';
import { TodoList } from '../../schemas/todo-list.schema';
import { UpdateTodoListCommand } from './commands/update-todo-list.command';
import { GetTodoListByIdQuery } from './queries/get-todo-list-by-id.query';
import { RemoveTodoListCommand } from './commands/remove-todo-list.command';

@Injectable()
export class TodoListService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userService: UserService,
    // private readonly todoItemService: TodoItemService,
    private readonly queryBus: QueryBus,
  ) {}

  async createTodoList(createTodoListDto: CreateTodoListDto) {
    createTodoListDto.TodoItems = [];
    let res;
    try {
      res = await this.commandBus.execute(
        new CreateTodoListCommand(createTodoListDto),
      );
    } catch (e) {
      throw new BadRequestException('title todo list exist!');
    }
    const user = await this.userService.findById(createTodoListDto.userId);

    user.todoLists.push(res._id.toString());
    await this.userService.updateUser(
      createTodoListDto.userId,
      { username: user.username },
      user.todoLists,
    );
    return res;
  }

  async getTodoList(user: User): Promise<TodoList[]> {
    return await this.queryBus.execute(
      new GetTodoListUserQuery(user._id.toString()),
    );
  }

  async updateTodoList(id: string, dto): Promise<TodoList> {
    return await this.commandBus.execute(
      new UpdateTodoListCommand(id, dto.title, dto.todoItems),
    );
  }

  public async findById(todoListId: string): Promise<TodoList> {
    return await this.queryBus.execute(new GetTodoListByIdQuery(todoListId));
  }

  public async removeTodoList(id): Promise<boolean> {
    const item = await this.findById(id);
    console.log(item);

    if (!item) {
      throw new BadRequestException('id not exist');
    }
    return await this.commandBus.execute(new RemoveTodoListCommand(id));
  }
}
