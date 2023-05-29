import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { TSortOptions } from '@app/common/types/sort-options.type';
import { BlogPostEntity } from '@app/modules/blog-post/db/blog-post.entity';

// Pagination and sorting example

@InputType()
class OrderPostsList implements TSortOptions<BlogPostEntity> {
  @Field({ nullable: true })
  title: 'ASC' | 'DESC';
}

@InputType()
export class GetPostsListInput {
  @Field()
  take: number;
  @Field({ nullable: true })
  skip?: number;
  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  order: OrderPostsList;
}
