import { Module } from '@nestjs/common';
import { UserResolver } from '@app/modules/user/user.resolver';
import { UserService } from '@app/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/modules/user/db/user.entity';
import { UserRepository } from '@app/modules/user/db/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService, UserRepository],
  providers: [UserResolver, UserService, UserRepository],
})
export class UserModule {}
