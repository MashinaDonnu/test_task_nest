import { CreateBlogInput } from '@app/modules/blog/inputs/create-blog.input';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBlogInput extends CreateBlogInput {
  @Field(() => ID)
  id: string;
}
