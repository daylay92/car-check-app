/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  WalletDetails,
  WalletService,
  NewWallet,
  TransactDetails
} from '../../../../proto/build/wallet';
import { promisify } from '../../utils';

@Injectable()
export class WalletProviderService implements OnModuleInit {
  private walletService: WalletService;
  constructor(@Inject('WALLET_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.walletService = promisify(
      this.client.getService<WalletService>('WalletService'),
    );
  }

  async createWallet(userId: string): Promise<NewWallet> {
    return this.walletService.Create({ userId });
  }

  async fetchBalance(userId: string): Promise<WalletDetails> {
    return this.walletService.GetWallet({ userId });
  }

  async topupWallet(userId: string, amount: number): Promise<TransactDetails> {
    return this.walletService.Topup({ userId, amount });
  }
}
