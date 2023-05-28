import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/modules/user/db/user.entity';
import { UserRepository } from '@app/modules/user/db/user.repository';
import { AuthResolver } from '@app/modules/auth/auth.resolver';
import { AuthService } from '@app/modules/auth/auth.service';
import { ResponseService } from '@app/services/response.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthResolver, AuthService, UserRepository, ResponseService, JwtService],
})
export class AuthModule {}
