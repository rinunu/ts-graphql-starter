import { Module } from '@nestjs/common';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from './graphql/users.resolver';
import { PostsResolver } from './graphql/posts.resolver';
import { SampleModule } from '@backend/sample';
import { UserModule } from '@backend/user';
import { FirebaseAuthModule } from '@backend/firebase-auth';
import { MyResolver } from './graphql/my.resolver';
import { ConfigModule } from '@nestjs/config';
import { SentryModule } from '@backend/sentry';

@Module({
  imports: [
    SampleModule,
    UserModule,
    SentryModule.forRoot({
      dsn: (process.env as any).API_SENTRY_DSN,
    }),
    FirebaseAuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'graphql/schema.gql',
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [UsersResolver, PostsResolver, MyResolver],
})
export class AppModule {}
