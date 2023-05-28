import { AbstractRepository } from '@app/common/abstract.repository';
import { UserEntity } from '@app/modules/user/db/user.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends AbstractRepository<UserEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(UserEntity, _dataSource.createEntityManager());
  }
}
