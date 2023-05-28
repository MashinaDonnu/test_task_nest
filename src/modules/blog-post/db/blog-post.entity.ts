import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '@app/common/abstract.entity';
import { BlogEntity } from '@app/modules/blog/db/blog.entity';

@ObjectType()
@Entity({ name: 'blogPost' })
export class BlogPostEntity extends AbstractEntity {
  @Field()
  @Column({ type: 'varchar' })
  title: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  image: string;

  @Field(() => BlogEntity)
  @OneToMany(() => BlogEntity, (blog) => blog.posts, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  blog: BlogEntity;
}
