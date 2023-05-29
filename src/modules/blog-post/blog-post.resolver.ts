import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/common/guards/auth.guard';

import { Permissions } from '@app/common/decorators/permission.decorator';
import { ERoles } from '@app/common/enums/roles.enum';
import { BlogPostService } from '@app/modules/blog-post/blog-post.service';
import { CreateBlogPostInput } from '@app/modules/blog-post/inputs/create-blog-post.input';
import { BlogPostEntity } from '@app/modules/blog-post/db/blog-post.entity';
import { UpdateBlogPostInput } from '@app/modules/blog-post/inputs/update-blog-post.input';
import { GetPostsListInput } from '@app/modules/blog-post/inputs/get-posts-list.input';

@Resolver()
export class BlogPostResolver {
  constructor(private readonly _service: BlogPostService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Mutation(() => BlogPostEntity)
  async createPost(@Args('createPost') createPost: CreateBlogPostInput): Promise<BlogPostEntity> {
    console.log('createPost: ', createPost);
    return await this._service.create(createPost);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => BlogPostEntity)
  async updatePost(@Args('updatePost') updatePost: UpdateBlogPostInput): Promise<BlogPostEntity> {
    return await this._service.update(updatePost);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async deletePost(@Args('id') id: string): Promise<string> {
    await this._service.delete(id);
    return id;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Query(() => BlogPostEntity)
  async getPostById(@Args('id') id: string): Promise<BlogPostEntity> {
    return await this._service.getById(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Query(() => [BlogPostEntity])
  async getPostByBlogId(@Args('blogId') blogId: string): Promise<BlogPostEntity[]> {
    return await this._service.getByBlogId(blogId);
  }

  @HttpCode(HttpStatus.OK)
  @Permissions([ERoles.moderator])
  @UseGuards(AuthGuard)
  @Query(() => [BlogPostEntity])
  async getAllPosts(): Promise<BlogPostEntity[]> {
    return await this._service.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Permissions([ERoles.writer])
  @UseGuards(AuthGuard)
  @Query(() => [BlogPostEntity])
  async getAllPostsPaginate(
    @Args('getAllPostsPaginate') getAllPostsPaginate: GetPostsListInput,
  ): Promise<BlogPostEntity[]> {
    return await this._service.getAllPaginate(getAllPostsPaginate);
  }
}
