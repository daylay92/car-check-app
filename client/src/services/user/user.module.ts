import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { WalletModule } from '../wallet/wallet.module';
import { AuthenticateMiddleware } from '../../middlewares/authentication.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import {
  userServiceOptions,
  authServiceOptions,
} from '../../config/grpc.options';


@Module({
  imports: [
    ClientsModule.register([userServiceOptions, authServiceOptions]),
    WalletModule,
  ],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthenticateMiddleware).forRoutes(UserController).apply(UserMiddleware, UserMiddleware.VerifyOwner()).forRoutes('api/v1/users/:userId/wallet', 'api/v1/users/:userId');
  }
}
