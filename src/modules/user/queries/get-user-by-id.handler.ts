import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../user.repository';
import { User } from '@schemas/user.schema';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { ObjectId } from 'mongodb';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<User | null> {
    const { id } = query;
    const _id = new ObjectId(id);
    return await this.userRepository.findOneUser({ _id });
  }
}
