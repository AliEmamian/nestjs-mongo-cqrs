import { AbstractRepository } from '../../modules/database/abstract.repository';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, UpdateQuery } from 'mongoose';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { User } from '../../schemas/user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }

  public async createUser(hash: string, username: string): Promise<User> {
    if (!username) {
      throw new BadRequestException('The user must have a username');
    }
    console.log('repository', hash, username);

    return this.create({ username, hash, todoLists: [] });
  }

  public async findOneUser(param: Partial<User>): Promise<User> {
    return this.findOne(param);
  }

  public async updateUser(
    _id: string,
    param: UpdateQuery<Partial<User>>,
  ): Promise<User> {
    console.log(param);

    return this.findOneAndUpdate({ _id }, param);
  }
}
