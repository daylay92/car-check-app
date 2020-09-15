import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthenticateMiddleware } from 'src/middlewares/authentication.middleware';
import { authorize } from 'src/middlewares/authorization.middleware';
import { carServiceOptions, authServiceOptions } from '../../config/grpc.options';
import { CarController } from './car.controller';

@Module({
    imports: [ClientsModule.register([carServiceOptions, authServiceOptions])],
    controllers:[CarController]
})
export class CarModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
      consumer.apply(AuthenticateMiddleware, authorize).forRoutes(CarController);
    }
  }