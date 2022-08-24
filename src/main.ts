import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from './common/configs/config.interface';
import { createPrismaQueryEventHandler } from 'prisma-query-log';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  const log = createPrismaQueryEventHandler();
  prismaService.$on('query', log);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig?.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Default Swagger Title')
      .setDescription(
        swaggerConfig.description || 'The Brave OOO API description',
      )
      .setVersion(swaggerConfig.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('docs', app, document);
  }

  // Cors
  if (corsConfig?.enabled) {
    app.enableCors();
  }

  app.useLogger(app.get(Logger));

  await app.listen(process.env.PORT || nestConfig?.port || 3000);
}
bootstrap();
