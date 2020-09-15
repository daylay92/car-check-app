import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { WalletModule } from '../wallet/wallet.module';
import { authServiceOptions } from '../../config/grpc.options';

@Module({
  imports: [ClientsModule.register([authServiceOptions]), WalletModule],
  controllers: [AuthController],
})
export class AuthModule {}
