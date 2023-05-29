import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;
}
