import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configSetting from './common/configs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { GraphQLModule } from '@nestjs/graphql';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { PostsModule } from './posts/posts.module';
import { GqlConfigService } from './common/configs/gql-config.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${__dirname}/common/configs/env/.${process.env.NODE_ENV}.env`,
      ],
      load: [configSetting],
      isGlobal: true,
    }),

    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: [
            {
              emit: 'event',
              level: 'query',
            },
            {
              emit: 'stdout',
              level: 'error',
            },
            {
              emit: 'stdout',
              level: 'info',
            },
            {
              emit: 'stdout',
              level: 'warn',
            },
          ],
        },
      },
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    LoggerModule.forRoot(),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, GqlConfigService],
})
export class AppModule {}
