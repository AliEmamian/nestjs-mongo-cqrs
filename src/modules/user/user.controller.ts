import {
  ApiOkResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { HttpStatus, Controller, HttpCode, Body, Post } from '@nestjs/common';
import { Public } from '../../shared/decorators/public.decorator';
import { UserService } from './user.service';
import { User } from '../../schemas/user.schema';
import { CreateUserDto } from './dto';
import { Tokens } from './interfaces';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  signupLocal(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signing')
  @ApiOkResponse({ type: CreateUserDto, isArray: true })
  signingLocal(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.userService.signing(dto);
  }
}
