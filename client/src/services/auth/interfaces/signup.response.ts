export interface SignupResponse{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  token: string;
  createdAt: string;
  walletId: string;
  balance: number;
}