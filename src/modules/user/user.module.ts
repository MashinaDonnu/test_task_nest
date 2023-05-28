import { Module } from '@nestjs/common';
import { UserResolver } from '@app/modules/user/user.resolver';
import { UserService } from '@app/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/modules/user/db/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
