import { AbstractRepository } from '@app/common/abstract.repository';
import { BlogEntity } from '@app/modules/blog/db/blog.entity';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogRepository extends AbstractRepository<BlogEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(BlogEntity, _dataSource.createEntityManager());
  }
}
