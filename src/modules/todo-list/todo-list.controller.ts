import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiBody,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import {
  HttpStatus,
  Controller,
  HttpCode,
  Body,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { GetCurrentUserId } from '../../shared/decorators/get-current-user-id.decorator';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { TodoList } from '../../schemas/todo-list.schema';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';

@ApiTags('TodoList')
@Controller()
export class TodoListController {
  constructor(private todoListService: TodoListService) { }

  @Post()
  @ApiBody({ type: CreateTodoListDto })
  @ApiBearerAuth()
  createTodoList(
    @GetCurrentUserId() user,
    @Body() dto: any,
  ): Promise<TodoList> {
    dto.userId = user._id.toString();
    return this.todoListService.createTodoList(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiBearerAuth()
  getTodoList(@GetCurrentUserId() user): Promise<TodoList[]> {
    return this.todoListService.getTodoList(user);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiBody({ type: UpdateTodoListDto })
  updateTodoList(
    @Param('id') id,
    @Body() dto: UpdateTodoListDto,
  ): Promise<TodoList> {
    return this.todoListService.updateTodoList(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @ApiBearerAuth()
  removeTodoList(@Param('id') id): Promise<boolean> {
    return this.todoListService.removeTodoList(id);
  }
}
