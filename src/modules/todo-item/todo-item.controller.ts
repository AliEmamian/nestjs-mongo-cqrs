import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  HttpStatus,
  Controller,
  HttpCode,
  Body,
  Post,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { GetCurrentUserId } from '../../shared/decorators/get-current-user-id.decorator';
import { TodoItemService } from './todo-item.service';
import { TodoItem } from '../../schemas/todo-item.schema';

@ApiTags('TodoItem')
@Controller()
export class TodoItemController {
  constructor(private todoItemService: TodoItemService) {}

  @Post()
  // @ApiBody({ type: CreateTodoListDto })
  @ApiBearerAuth()
  createTodoItem(
    @GetCurrentUserId() user,
    @Body() dto: any,
  ): Promise<TodoItem> {
    dto.userId = user._id.toString();
    return this.todoItemService.createTodoItem(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  // @ApiBody({ type: UpdateTodoListDto })
  @ApiBearerAuth()
  updateTodoItem(@Param('id') id, @Body() dto: any): Promise<TodoItem> {
    return this.todoItemService.updateTodoItem(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiBearerAuth()
  getTodoItem(@Param('id') id): Promise<TodoItem> {
    return this.todoItemService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('todo-list/:id')
  @ApiBearerAuth()
  getTodoItemsOfList(@Param('id') id): Promise<TodoItem[]> {
    return this.todoItemService.getTodoList(id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @ApiBearerAuth()
  removeTodoItem(@Param('id') id): Promise<boolean> {
    return this.todoItemService.removeTodoItem(id);
  }
}
