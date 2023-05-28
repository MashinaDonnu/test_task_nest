import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '@app/modules/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly _service: UserService) {}
}
