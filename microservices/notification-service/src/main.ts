import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';

import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { microserviceOptions } from './config/grpc.options';

const logger = new Logger('Notification Service');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    microserviceOptions,
  );
  await app.listenAsync();
  logger.log('Notification service listening for requests')
}
bootstrap();


