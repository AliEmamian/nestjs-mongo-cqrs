import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { User, userSchema } from '../../schemas/user.schema';
import { AtStrategy, RtStrategy } from './strategies';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user.handler';
import { GetUserHandler } from './queries/get-user.handler';
import { UpdateUserHandler } from './commands/update-user.handler';
import { GetUserByIdHandler } from './queries/get-user-by-id.handler';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    AtStrategy,
    RtStrategy,
    CreateUserHandler,
    GetUserHandler,
    UpdateUserHandler,
    GetUserByIdHandler,
  ],
  exports: [
    UserService,
    AtStrategy,
    RtStrategy,
    CreateUserHandler,
    GetUserHandler,
    UpdateUserHandler,
  ],
})
export class UserModule {}
