import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPostEntity } from '@app/modules/blog-post/db/blog-post.entity';
import { BlogPostResolver } from '@app/modules/blog-post/blog-post.resolver';
import { BlogPostService } from '@app/modules/blog-post/blog-post.service';
import { BlogPostRepository } from '@app/modules/blog-post/db/blog-post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPostEntity])],
  providers: [BlogPostResolver, BlogPostService, BlogPostRepository],
})
export class BlogPostModule {}
