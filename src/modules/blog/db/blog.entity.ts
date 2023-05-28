import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '@app/common/abstract.entity';
import { UserEntity } from '@app/modules/user/db/user.entity';

@ObjectType()
@Entity({ name: 'blogs' })
export class BlogEntity extends AbstractEntity {
  @Field()
  @Column({ type: 'varchar' })
  title: string;

  @Field()
  @Column({ type: 'varchar', nullable: true })
  subTitle: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  image: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.blogs, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;
}
