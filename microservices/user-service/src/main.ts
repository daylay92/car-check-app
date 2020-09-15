import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { SeedModule } from './seed/seed.module';
import {UserSeedService} from './seed/seed.service';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { microserviceOptions } from './config/grpc.options';

const logger = new Logger('User Service');

async function bootstrap() {
  const seedApp = await NestFactory.createApplicationContext(SeedModule);
  await seedApp.get(UserSeedService).seedAdmin()
  logger.log('Seeding complete!')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    microserviceOptions,
  );
  await app.listenAsync();
  logger.log('User service listening for requests')
}
bootstrap();
