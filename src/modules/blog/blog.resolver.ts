import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BlogService } from '@app/modules/blog/blog.service';
import { HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserEntity } from '@app/modules/user/db/user.entity';
import { ERoles } from '@app/common/enums/roles.enum';
import { Permissions } from '@app/common/decorators/permission.decorator';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { BlogEntity } from '@app/modules/blog/db/blog.entity';

@Resolver()
export class BlogResolver {
  constructor(private readonly _service: BlogService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => BlogEntity)
  async create() {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => BlogEntity)
  async update() {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => BlogEntity)
  async delete() {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => BlogEntity)
  async getById() {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => BlogEntity)
  getByUserId() {}

  @HttpCode(HttpStatus.OK)
  @Permissions([ERoles.writer])
  @UseGuards(AuthGuard)
  @Mutation(() => BlogEntity)
  getAll() {}
}
