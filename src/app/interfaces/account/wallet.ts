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

export interface BankResponse {
  message: string;
  data: Bank[];
}
export interface Bank {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  active: boolean;
  is_deleted: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountResponse {
  message: string;
  data: UserAccount;
}

export interface UserAccount {
  _id: string;
  user: string;
  bankId: number;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  currency: string;
  accountName: string;
  gatewayRecipientCode: string;
}

export enum TransctionType {
  credit = "credit",
  debit = "debit",
}

export interface Transaction {
  user: string;
  collectionAccount: string;
  amount: number;
  paymentReference: string;
  externalReference: string;
  narration: string;
  paymentChannel: string;
  transactionType: TransctionType;
  transferCode: string;
  responseCode: number;
  responseMessage: string;
  currency: string;
  transactionDate: Date;
  transactionStatus: string;
  responseBody?: string;
}
