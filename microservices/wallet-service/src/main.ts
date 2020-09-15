import { NestFactory } from '@nestjs/core';
import { WalletModule } from './wallet.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { microserviceOptions } from './config/grpc.options';

const logger = new Logger('Wallet Service');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WalletModule,
    microserviceOptions,
  );
  await app.listenAsync();
  logger.log('Wallet service listening for requests')
}
bootstrap();
