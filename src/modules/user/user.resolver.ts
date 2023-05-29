import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '@app/modules/user/user.service';
import { HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { BlogEntity } from '@app/modules/blog/db/blog.entity';
import { UserEntity } from '@app/modules/user/db/user.entity';
import { Permissions } from '@app/common/decorators/permission.decorator';
import { ERoles } from '@app/common/enums/roles.enum';
import { UpdateUserInput } from '@app/modules/user/inputs/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly _service: UserService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Mutation(() => UserEntity)
  async updateUser(@Args('updateUser') updateUser: UpdateUserInput): Promise<UserEntity> {
    return await this._service.update(updateUser);
  }

  @HttpCode(HttpStatus.OK)
  @Permissions([ERoles.moderator])
  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async deleteUser(@Args('id') id: string): Promise<string> {
    await this._service.delete(id);
    return id;
  }

  @HttpCode(HttpStatus.OK)
  @Permissions([ERoles.moderator])
  @UseGuards(AuthGuard)
  @Query(() => BlogEntity)
  async getUserById(@Args('id') id: string): Promise<UserEntity> {
    return await this._service.getById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Permissions([ERoles.moderator])
  @UseGuards(AuthGuard)
  @Query(() => [UserEntity])
  async getAllBlogs(): Promise<UserEntity[]> {
    return await this._service.getAll();
  }
}
