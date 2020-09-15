import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { microserviceOptions } from './config/grpc.options';

const logger = new Logger('Order Service');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrderModule, microserviceOptions);
  await app.listenAsync();
  logger.log('Order service listening for requests')
}
bootstrap();
