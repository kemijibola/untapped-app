import { Action } from "@ngrx/store";
import { IWallet } from "src/app/interfaces/account/wallet";

export const CREATE_WALLET = "CREATE_WALLET";
export const CREATE_WALLET_SUCCESS = "CREATE_WALLET_SUCCESS";
export const CREATE_WALLET_ERROR = "CREATE_WALLET_ERROR";
export const FETCH_WALLET = "FETCH_WALLET";
export const FETCH_WALLET_SUCCESS = "FETCH_WALLET_SUCCESS";
export const FETCH_WALLET_ERROR = "FETCH_WALLET_ERROR";

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
export type WalletActions =
  | CreateWallet
  | CreateWalletSuccess
  | CreateWalletError
  | FetchWallet
  | FetchWalletSuccess
  | FetchWalletError;
