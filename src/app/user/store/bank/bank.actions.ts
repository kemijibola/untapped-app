import { UserAccount } from "./../../../interfaces/account/wallet";
import { Action } from "@ngrx/store";
import { Bank } from "src/app/interfaces/account/wallet";
import { PaymentProcessor } from "src/app/interfaces";

export const FETCH_BANKS = "FETCH_BANKS";
export const FETCH_BANK = "FETCH_BANK";
export const FETCH_BANKS_SUCCESS = "FETCH_BANKS_SUCCESS";
export const SETUP_BANK_DETAILS = "SETUP_BANK_DETAILS";
export const SETUP_BANK_DETAILS_SUCCESS = "SETUP_BANK_DETAILS_SUCCESS";
export const SETUP_BANK_DETAILS_ERROR = "SETUP_BANK_DETAILS_ERROR";
export const FETCH_USER_ACCOUNT = "FETCH_USER_ACCOUNT";
export const FETCH_USER_ACCOUNT_SUCCESS = "FETCH_USER_ACCOUNT_SUCCESS";
export const FETCH_USER_ACCOUNT_ERROR = "FETCH_USER_ACCOUNT_ERROR";

export class FetchBanks implements Action {
  readonly type = FETCH_BANKS;
  constructor(
    public payload: {
      processor: PaymentProcessor;
    }
  ) {}
}

export class FetchBank implements Action {
  readonly type = FETCH_BANK;
  constructor(public payload: { bankId: string }) {}
}

export class FetchBanksSuccess implements Action {
  readonly type = FETCH_BANKS_SUCCESS;
  constructor(public payload: { banks: Bank[] }) {}
}

export class SetUpBankDetails implements Action {
  readonly type = SETUP_BANK_DETAILS;
  constructor(
    public payload: {
      processor: PaymentProcessor;
      accountNumber: string;
      bankCode: string;
    }
  ) {}
}

export class SetUpBankDetailsSuccess implements Action {
  readonly type = SETUP_BANK_DETAILS_SUCCESS;
  constructor(public payload: { userAccount: UserAccount }) {}
}

export class SetUpBankDetailsError implements Action {
  readonly type = SETUP_BANK_DETAILS_ERROR;
}

export class FetchUserAccount implements Action {
  readonly type = FETCH_USER_ACCOUNT;
}

export class FetchUserAccountSuccess implements Action {
  readonly type = FETCH_USER_ACCOUNT_SUCCESS;
  constructor(public payload: { userAccount: UserAccount }) {}
}

export class FetchUserAccountError implements Action {
  readonly type = FETCH_USER_ACCOUNT_ERROR;
}

export type BankActions =
  | FetchBanks
  | FetchBanksSuccess
  | FetchBank
  | SetUpBankDetails
  | SetUpBankDetailsSuccess
  | SetUpBankDetailsError
  | FetchUserAccount
  | FetchUserAccountSuccess
  | FetchUserAccountError;
