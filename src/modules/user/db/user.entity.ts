import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '@app/common/abstract.entity';
import { ERoles } from '@app/common/enums/roles.enum';
import * as bcrypt from 'bcrypt';
import { BlogEntity } from '@app/modules/blog/db/blog.entity';

@ObjectType()
@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
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

  @BeforeInsert()
  async hashPassword() {
    console.log('hashPassword');
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @Field()
  @Column({ nullable: true })
  rt: string;

  @Field(() => [BlogEntity])
  @OneToMany(() => BlogEntity, (blog) => blog.user)
  blogs: BlogEntity[];
}
