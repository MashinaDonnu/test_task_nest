import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppResolver } from '@app/app.resolver';
import graphqlConfig from '@app/configs/graphql.config';
import { ormConfig } from '@app/configs/orm.config';
import { UserModule } from '@app/modules/user/user.module';
import { AuthModule } from '@app/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot(graphqlConfig()),
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    UserModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
