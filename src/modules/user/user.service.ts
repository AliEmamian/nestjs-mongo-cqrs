import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import {
  ForbiddenException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserRolesEnum } from '../../shared/models/enums/user.enum';
import { JwtPayload, Tokens } from './interfaces';
import { User } from '../../schemas/user.schema';
import { CreateUserDto } from './dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './queries/get-user.query';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { GetUserByIdQuery } from './queries/get-user-by-id.query';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async signup(payload: CreateUserDto): Promise<User> {
    const user = await this.queryBus.execute(
      new GetUserQuery(payload.username),
    );
    if (user) {
      throw new ConflictException('The user is registered with this username');
    }

    const hash = await bcrypt.hash(payload.password, 10);
    const newUser = await this.commandBus.execute(
      new CreateUserCommand(payload.username, hash, []),
    );
    return newUser;
  }

  public async signing(payload: CreateUserDto): Promise<Tokens> {
    const user = await this.queryBus.execute(
      new GetUserQuery(payload.username),
    );
    if (!user) throw new ForbiddenException('Invalid username or password');

    const passwordMatches = await bcrypt.compare(payload.password, user.hash);
    if (!passwordMatches)
      throw new ForbiddenException('Invalid username or password');

    const token = await this.getTokens(
      user._id,
      UserRolesEnum.USER,
      user.username,
    );
    return token;
  }

  public async getTokens(
    objectId: ObjectId,
    privilege: UserRolesEnum,
    username: string,
  ): Promise<Tokens> {
    const userId = objectId.toString();
    const jwtPayload: JwtPayload = {
      upr: privilege,
      uid: userId,
      username: username,
    };

    const [at] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '185d',
      }),
    ]);

    return {
      accessToken: at,
    };
  }

  public async updateUser(
    id: string,
    payload: Partial<User>,
    todoLists,
  ): Promise<User> {
    return await this.commandBus.execute(
      new UpdateUserCommand(payload.username, id, todoLists),
    );
  }

  public async findById(userId: string): Promise<User> {
    return await this.queryBus.execute(new GetUserByIdQuery(userId));
  }
}
