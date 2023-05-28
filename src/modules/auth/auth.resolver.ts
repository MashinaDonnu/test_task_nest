import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from '@app/modules/user/db/user.entity';
import { CreateUserInput } from '@app/modules/auth/inputs/create-user.input';
import { AuthService } from '@app/modules/auth/auth.service';
import { LoginUserInput } from '@app/modules/auth/inputs/login-user.input';
import { AuthResponse } from '@app/modules/auth/response/auth.response';
import { HttpCode, HttpStatus } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly _service: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Mutation(() => UserEntity)
  async register(@Args('createUser') createUser: CreateUserInput): Promise<UserEntity> {
    return await this._service.register(createUser);
  }

  @HttpCode(HttpStatus.OK)
  @Mutation(() => AuthResponse)
  async login(@Args('loginUser') loginUser: LoginUserInput): Promise<AuthResponse> {
    return await this._service.login(loginUser);
  }
}
