import { Action } from "@ngrx/store";
import { IWallet, Transaction } from "src/app/interfaces/account/wallet";
import { PaymentProcessor } from "src/app/interfaces";

export const CREATE_WALLET = "CREATE_WALLET";
export const CREATE_WALLET_SUCCESS = "CREATE_WALLET_SUCCESS";
export const CREATE_WALLET_ERROR = "CREATE_WALLET_ERROR";
export const FETCH_WALLET = "FETCH_WALLET";
export const FETCH_WALLET_SUCCESS = "FETCH_WALLET_SUCCESS";
export const FETCH_WALLET_ERROR = "FETCH_WALLET_ERROR";
export const REQUEST_PAYOUT = "REQUEST_PAYOUT";
export const REQUEST_PAYOUT_SUCCESS = "REQUEST_PAYOUT_SUCCESS";
export const REQUEST_PAYOUT_ERROR = "REQUEST_PAYOUT_ERROR";

export const FETCH_USER_TRANSACTION = "FETCH_USER_TRANSACTION";
export const FETCH_USER_TRANSACTION_SUCCESS = "FETCH_USER_TRANSACTION_SUCCESS";
export const FETCH_USER_TRANSACTION_FAILED = "FETCH_USER_TRANSACTION_FAILED";

export class CreateWallet implements Action {
  readonly type = CREATE_WALLET;
  constructor(public payload: { pin: string }) {}
}

export class CreateWalletSuccess implements Action {
  readonly type = CREATE_WALLET_SUCCESS;
  constructor(public payload: { walletData: IWallet }) {}
}

export class CreateWalletError implements Action {
  readonly type = CREATE_WALLET_ERROR;
}

export class FetchWallet implements Action {
  readonly type = FETCH_WALLET;
}

export class FetchWalletSuccess implements Action {
  readonly type = FETCH_WALLET_SUCCESS;
  constructor(public payload: { walletData: IWallet }) {}
}

export class FetchWalletError implements Action {
  readonly type = FETCH_WALLET_ERROR;
}

export class RequestPayout implements Action {
  readonly type = REQUEST_PAYOUT;
  constructor(
    public payload: {
      processor: PaymentProcessor;
      walletPin: string;
      amount: string;
      narration: string;
    }
  ) {}
}
export class RequestPayoutSuccess implements Action {
  readonly type = REQUEST_PAYOUT_SUCCESS;
  constructor(public payload: { walletData: IWallet }) {}
}

export class RequestPayoutError implements Action {
  readonly type = REQUEST_PAYOUT_ERROR;
}

export class FetchUserTransaction implements Action {
  readonly type = FETCH_USER_TRANSACTION;
}

export class FetchUserTransactionSuccess implements Action {
  readonly type = FETCH_USER_TRANSACTION_SUCCESS;
  constructor(public payload: { transactions: Transaction[] }) {}
}

export class FetchUserTransactionFailed implements Action {
  readonly type = FETCH_USER_TRANSACTION_FAILED;
}

export type WalletActions =
  | CreateWallet
  | CreateWalletSuccess
  | CreateWalletError
  | FetchWallet
  | FetchWalletSuccess
  | FetchWalletError
  | RequestPayout
  | RequestPayoutSuccess
  | RequestPayoutError
  | FetchUserTransaction
  | FetchUserTransactionSuccess
  | FetchUserTransactionFailed;
