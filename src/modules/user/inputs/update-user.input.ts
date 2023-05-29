import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;
}
