import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppResolver } from '@app/app.resolver';
import graphqlConfig from '@app/configs/graphql.config';
import ormConfig from '@app/configs/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `${__dirname}../.env` }),
    GraphQLModule.forRoot(graphqlConfig()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ormConfig(config),
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}
