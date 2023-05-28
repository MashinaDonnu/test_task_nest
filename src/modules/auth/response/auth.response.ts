import { UserEntity } from '@app/modules/user/db/user.entity';
import { ITokens } from '@app/modules/auth/types/tokens.interface';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Tokens {
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  user: UserEntity;
  @Field()
  tokens: Tokens;
}
