import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { WalletProviderService } from './wallet.service';
import { walletServiceOptions } from '../../config/grpc.options';

@Module({
  imports: [ClientsModule.register([walletServiceOptions])],
  providers: [WalletProviderService],
  exports: [WalletProviderService],
})
export class WalletModule {}
