import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppResolver } from '@app/app.resolver';
import graphqlConfig from '@app/configs/graphql.config';
import { ormConfig } from '@app/configs/orm.config';
import { UserModule } from '@app/modules/user/user.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { BlogModule } from '@app/modules/blog/blog.module';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot(graphqlConfig()),
    TypeOrmModule.forRoot(ormConfig),
    SharedModule,
    AuthModule,
    UserModule,
    BlogModule,
  ],
  providers: [AppResolver],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
