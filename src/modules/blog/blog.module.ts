import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from '@app/modules/blog/db/blog.entity';
import { BlogResolver } from '@app/modules/blog/blog.resolver';
import { BlogService } from '@app/modules/blog/blog.service';
import { BlogRepository } from '@app/modules/blog/db/blog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  providers: [BlogResolver, BlogService, BlogRepository],
})
export class BlogModule {}
