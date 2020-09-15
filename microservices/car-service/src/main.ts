import { NestFactory } from '@nestjs/core';
import { CarModule } from './car.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { microserviceOptions } from './config/grpc.options';


const logger = new Logger('Car Service');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CarModule,
    microserviceOptions,
  );
  await app.listenAsync();
  logger.log('Car service listening for requests')
}
bootstrap();
