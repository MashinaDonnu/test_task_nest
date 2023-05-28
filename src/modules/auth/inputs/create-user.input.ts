import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { ERoles } from '@app/common/enums/roles.enum';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
