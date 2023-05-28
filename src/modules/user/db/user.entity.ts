import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '@app/common/abstract.entity';
import { ERoles } from '@app/common/enums/roles.enum';

@ObjectType()
@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @Column({ type: 'varchar', default: ERoles.writer })
  role: ERoles;
}
