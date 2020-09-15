/* eslint-disable */


export interface WalletUser {
  userId: string;
}

export interface TransactData {
  userId: string;
  amount: number;
}

export interface NewWallet {
  owner: string;
  balance: number;
  createdAt: string;
  id: string;
}

export interface TransactDetails {
  owner: string;
  newBalance: number;
  oldBalance: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface WalletDetails {
  owner: string;
  balance: number;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface IsExist {
  isExist: boolean;
}

export interface WalletService {

  Create(request: WalletUser): Promise<NewWallet>;

  Topup(request: TransactData): Promise<TransactDetails>;

  GetWallet(request: WalletUser): Promise<WalletDetails>;

  CheckExist(request: WalletUser): Promise<IsExist>;

  DebitWallet(request: TransactData): Promise<TransactDetails>;

}
