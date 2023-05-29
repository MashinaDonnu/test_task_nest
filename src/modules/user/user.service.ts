import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/modules/user/db/user.repository';
import { UserEntity } from './db/user.entity';
import { UpdateUserInput } from '@app/modules/user/inputs/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly _repository: UserRepository) {}

  async update(dto: UpdateUserInput): Promise<UserEntity> {
    return await this._repository.updateOneEntityById(dto.id, dto);
  }

  async delete(id: string): Promise<void> {
    await this._repository.deleteOneEntity({ id });
  }

  async getById(id: string): Promise<UserEntity> {
    return await this._repository.findOneEntity({ where: { id } });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this._repository.findManyEntities();
  }
}
