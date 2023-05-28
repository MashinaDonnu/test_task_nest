import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateBlogPostInput } from '@app/modules/blog-post/inputs/create-blog-post.input';

@InputType()
export class UpdateBlogPostInput extends CreateBlogPostInput {
  @Field(() => ID)
  id: string;
}
