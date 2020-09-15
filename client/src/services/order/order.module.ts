
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthenticateMiddleware } from 'src/middlewares/authentication.middleware';
import { authorize } from 'src/middlewares/authorization.middleware';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { orderServiceOptions, authServiceOptions } from '../../config/grpc.options';
import { OrderController } from './order.controller';

@Module({
    imports: [ClientsModule.register([orderServiceOptions, authServiceOptions])],
    controllers:[OrderController]
})
export class OrderModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
      consumer.apply(AuthenticateMiddleware).forRoutes(OrderController).apply(authorize).forRoutes({ path: 'api/v1/orders', method: RequestMethod.GET }).apply(UserMiddleware.VerifyOwner('body')).forRoutes({ path: 'api/v1/orders', method: RequestMethod.POST });
    }
  }

