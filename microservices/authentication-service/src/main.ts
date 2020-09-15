import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { microserviceOptions } from './config/grpc.options';

const logger = new Logger('Authentication Service');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    microserviceOptions,
  );
  await app.listenAsync();
  logger.log('Authentication service listening for requests')
}
bootstrap();

