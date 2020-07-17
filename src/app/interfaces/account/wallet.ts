export interface IWallet {
  _id?: string;
  walletNumber: string;
  user: string;
  pin: string;
  status: string;
  balance: Number;
}
