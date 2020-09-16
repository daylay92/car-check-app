/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Metadata } from 'grpc';
import { Types } from 'mongoose';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  TransactDetails,
  WalletDetails,
  TransactData,
  WalletUser,
  NewWallet,
  IsExist,
} from '../../../proto/build/wallet';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @GrpcMethod('WalletService', 'Create')
  async create(userData: WalletUser, _metadata: Metadata): Promise<NewWallet> {
    const { id, owner, balance, createdAt } = await this.walletService.create(
      userData,
    );
    return {
      id,
      owner: String(owner),
      balance,
      createdAt: createdAt.toISOString(),
    };
  }
  @GrpcMethod('WalletService', 'Topup')
  async topup(
    { userId, amount }: TransactData,
    _metadata: Metadata,
  ): Promise<TransactDetails> {
    return this.walletService.addToBalance(userId, amount);
  }

  @GrpcMethod('WalletService', 'GetWallet')
  async getWallet(
    { userId }: WalletUser,
    _metadata: Metadata,
  ): Promise<WalletDetails> {
    return this.walletService.fetchWallet(userId);
  }

  @GrpcMethod('WalletService', 'DebitWallet')
  async debitWallet(
    { userId, amount }: TransactData,
    _metadata: Metadata,
  ): Promise<TransactDetails> {
    return this.walletService.deduceFromBalance(userId, amount);
  }

  @GrpcMethod('WalletService', 'CheckExist')
  async checkExist(
    { userId }: WalletUser,
    _metadata: Metadata,
  ): Promise<IsExist> {
    const isExist = await this.walletService.checkIfExist(userId);
    return { isExist };
  }
}
