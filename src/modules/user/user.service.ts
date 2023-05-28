import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/modules/user/db/user.repository';
import { UserEntity } from './db/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly _repository: UserRepository) {}

  async findById(id: string): Promise<UserEntity> {
    return await this._repository.findOneEntity({ where: { id } });
  }
}
