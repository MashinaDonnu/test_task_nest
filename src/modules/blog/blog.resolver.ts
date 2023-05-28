import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogService } from '@app/modules/blog/blog.service';
import { HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserEntity } from '@app/modules/user/db/user.entity';
import { ERoles } from '@app/common/enums/roles.enum';
import { Permissions } from '@app/common/decorators/permission.decorator';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { BlogEntity } from '@app/modules/blog/db/blog.entity';
import { CreateBlogInput } from '@app/modules/blog/inputs/create-blog.input';
import { User } from '@app/common/decorators/user.decorator';
import { UpdateBlogInput } from '@app/modules/blog/inputs/update-blog.input';
import { DeleteBlogInput } from '@app/modules/blog/inputs/delete-blog.input';

@Resolver()
export class BlogResolver {
  constructor(private readonly _service: BlogService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => BlogEntity)
  async create(@Args('createBlog') createBlog: CreateBlogInput, @User() currentUser: UserEntity): Promise<BlogEntity> {
    return await this._service.create(createBlog, currentUser);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => BlogEntity)
  async update(@Args('updateBlog') updateBlog: UpdateBlogInput): Promise<BlogEntity> {
    return await this._service.update(updateBlog);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async delete(@Args('deleteBlog') deleteBlog: DeleteBlogInput): Promise<string> {
    await this._service.delete(deleteBlog.id);
    return deleteBlog.id;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Query(() => BlogEntity)
  async getById(@Args('id') id: string): Promise<BlogEntity> {
    return await this._service.getById(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Query(() => [BlogEntity])
  async getByUserId(@Args('userId') userId: string): Promise<BlogEntity[]> {
    return await this._service.getByUserId(userId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Query(() => [BlogEntity])
  async getAllByUser(@User() currentUser: UserEntity): Promise<BlogEntity[]> {
    return await this._service.getByUserId(currentUser.id);
  }

  @HttpCode(HttpStatus.OK)
  @Permissions([ERoles.moderator])
  @UseGuards(AuthGuard)
  @Query(() => [BlogEntity])
  async getAll(): Promise<BlogEntity[]> {
    return await this._service.getAll();
  }
}
