import { AbstractRepository } from '@app/common/abstract.repository';
import { BlogPostEntity } from '@app/modules/blog-post/db/blog-post.entity';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogPostRepository extends AbstractRepository<BlogPostEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(BlogPostEntity, _dataSource.createEntityManager());
  }
}
