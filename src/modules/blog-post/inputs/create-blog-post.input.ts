import { Field, InputType } from '@nestjs/graphql';
import { BlogEntity } from '@app/modules/blog/db/blog.entity';
import { DeepPartial } from 'typeorm';

@InputType()
export class CreateBlogPostInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  subTitle?: string;

  @Field({ nullable: true })
  image?: string;

  @Field()
  description: string;

  @Field()
  blog: string;
}
