import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteBlogInput {
  @Field()
  id: string;
}
