import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './wallet.schema';
import { ICreateWallet } from './interfaces/create.wallet';
import { TransactDetails, WalletDetails } from '../../../proto/build/wallet';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  async create({ userId }: ICreateWallet): Promise<Wallet> {
    const wallet = new this.walletModel({ owner: userId });
    return wallet.save();
  }

  async addToBalance(userId: string, amount: number): Promise<TransactDetails> {
    const wallet = await this.walletModel.findOne({ owner: userId });
    if (!wallet) throw new RpcException("Cannot find the user's wallet");
    const oldBalance = wallet.balance;
    wallet.balance += amount;
    await wallet.save();
    return {
      id: wallet.id,
      owner: userId,
      newBalance: wallet.balance,
      oldBalance,
      createdAt: wallet.createdAt.toISOString(),
      updatedAt: wallet.createdAt.toISOString(),
    };
  }

  async deduceFromBalance(
    owner: string,
    amount: number,
  ): Promise<TransactDetails> {
    const wallet = await this.walletModel.findOne({ owner });
    if (!wallet) throw new RpcException("Cannot find the user's wallet");
    const oldBalance = wallet.balance;
    const newBalance = oldBalance - amount;
    if (newBalance < 0) throw new RpcException('Insufficient funds');
    wallet.balance = newBalance;
    await wallet.save();
    return {
      id: wallet.id,
      owner,
      newBalance: wallet.balance,
      oldBalance,
      createdAt: wallet.createdAt.toISOString(),
      updatedAt: wallet.createdAt.toISOString(),
    };
  }
  async checkIfExist(owner: string): Promise<boolean> {
    const wallet = await this.walletModel.findOne({ owner });
    return wallet ? true : false;
  }

  async fetchWallet(owner: string): Promise<WalletDetails> {
    const wallet = await this.walletModel.findOne({ owner });
    if (!wallet) throw new RpcException("Cannot find the user's wallet");
    return {
      id: wallet.id,
      owner,
      balance: wallet.balance,
      createdAt: wallet.createdAt.toISOString(),
      updatedAt: wallet.updatedAt.toISOString(),
    };
  }
}
