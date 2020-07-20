export interface IWallet {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  walletNmber: string;
  balance: number;
  status: string;
}
