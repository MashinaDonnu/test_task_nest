import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  subTitle?: string;

  @Field({ nullable: true })
  image?: string;

  @Field()
  description: string;
}
