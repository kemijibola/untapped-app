import { IProfile } from "src/app/interfaces";
import * as WalletActions from "./wallet.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./wallet.adapter";
import { OutboundState } from "src/app/shared/Util";
import { IWallet, Transaction } from "src/app/interfaces/account/wallet";

export interface WalletState extends EntityState<IWallet> {
  userWallet: IWallet | null;
  userWalletState: OutboundState;
  transactions: Transaction[] | [];
  transactionState: OutboundState;
  payOutState: OutboundState;
}

const initialState: WalletState = fromAdapter.adapter.getInitialState({
  userWallet: null,
  userWalletState: OutboundState.initiated,
  transactions: [],
  transactionState: OutboundState.initiated,
  payOutState: OutboundState.initiated,
});

export function walletReducer(
  state = initialState,
  action: WalletActions.WalletActions
): WalletState {
  switch (action.type) {
    case WalletActions.REQUEST_PAYOUT:
      return Object.assign({
        ...state,
        payOutState: OutboundState.inprogress,
      });
    case WalletActions.FETCH_USER_TRANSACTION:
      return Object.assign({
        ...state,
        transactionState: OutboundState.inprogress,
      });
    case WalletActions.CREATE_WALLET_SUCCESS:
      return Object.assign({
        ...state,
        userWallet: { ...action.payload.walletData },
        userWalletState: OutboundState.completed,
      });
    case WalletActions.CREATE_WALLET:
      return Object.assign({
        ...state,
        userWalletState: OutboundState.inprogress,
      });
    case WalletActions.CREATE_WALLET_ERROR:
      return Object.assign({
        ...state,
        userWalletState: OutboundState.failed,
      });
    case WalletActions.FETCH_WALLET:
      return Object.assign({
        ...state,
        userWalletState: OutboundState.inprogress,
      });
    case WalletActions.FETCH_WALLET_SUCCESS:
      return Object.assign({
        ...state,
        userWallet: action.payload.walletData,
        userWalletState: OutboundState.completed,
      });
    case WalletActions.FETCH_WALLET_ERROR:
      return Object.assign({
        ...state,
        userWalletState: OutboundState.failed,
      });
    case WalletActions.FETCH_USER_TRANSACTION_SUCCESS:
      return Object.assign({
        ...state,
        transactionState: OutboundState.completed,
        transactions: action.payload.transactions,
      });
    case WalletActions.FETCH_USER_TRANSACTION_FAILED:
      return Object.assign({
        ...state,
        transactionState: OutboundState.failed,
      });
    case WalletActions.REQUEST_PAYOUT_SUCCESS:
      return Object.assign({
        ...state,
        payOutState: OutboundState.completed,
      });
    case WalletActions.REQUEST_PAYOUT_ERROR:
      return Object.assign({
        ...state,
        payOutState: OutboundState.failed,
      });
    default: {
      return state;
    }
  }
}

export const getWalletState = createFeatureSelector<WalletState>("walletState");

const getStateCompleted = (state: WalletState): boolean =>
  state.userWalletState === OutboundState.completed;

const getStateInProgress = (state: WalletState): boolean =>
  state.userWalletState === OutboundState.inprogress;

const getStateInitiated = (state: WalletState): boolean =>
  state.userWalletState === OutboundState.initiated;

const getStateFailed = (state: WalletState): boolean =>
  state.userWalletState === OutboundState.failed;

const getTransactionStateCompleted = (state: WalletState): boolean =>
  state.transactionState === OutboundState.completed;

const getTransactionStateInProgress = (state: WalletState): boolean =>
  state.transactionState === OutboundState.inprogress;

const getTransactionStateInitiated = (state: WalletState): boolean =>
  state.transactionState === OutboundState.initiated;

const getTransactionStateFailed = (state: WalletState): boolean =>
  state.transactionState === OutboundState.failed;

const getPayoutStateCompleted = (state: WalletState): boolean =>
  state.payOutState === OutboundState.completed;

const getPayoutStateInProgress = (state: WalletState): boolean =>
  state.payOutState === OutboundState.inprogress;

const getPayoutStateInitiated = (state: WalletState): boolean =>
  state.payOutState === OutboundState.initiated;

const getPayoutStateFailed = (state: WalletState): boolean =>
  state.payOutState === OutboundState.failed;

const getSelectedCurrentUserWallet = (state: WalletState) => state.userWallet;

const getSelectedCurrentUserTransactions = (state: WalletState) =>
  state.transactions;

export const selectCurrentUserWallet = createSelector(
  getWalletState,
  getSelectedCurrentUserWallet
);

export const selectCurrentUserTransaction = createSelector(
  getWalletState,
  getSelectedCurrentUserTransactions
);

export const selectCompletedStatus = createSelector(
  getWalletState,
  getStateCompleted
);

export const selectInitiatedStatus = createSelector(
  getWalletState,
  getStateInitiated
);

export const selectInProgressStatus = createSelector(
  getWalletState,
  getStateInProgress
);

export const selectFailedStatus = createSelector(
  getWalletState,
  getStateFailed
);

export const selectTransactionCompletedStatus = createSelector(
  getWalletState,
  getTransactionStateCompleted
);

export const selectTransactionInitiatedStatus = createSelector(
  getWalletState,
  getTransactionStateInitiated
);

export const selectTransactionInProgressStatus = createSelector(
  getWalletState,
  getTransactionStateInProgress
);

export const selectTransactionFailedStatus = createSelector(
  getWalletState,
  getTransactionStateFailed
);

export const selectPayoutCompletedStatus = createSelector(
  getWalletState,
  getPayoutStateCompleted
);

export const selectPayoutInitiatedStatus = createSelector(
  getWalletState,
  getPayoutStateInitiated
);

export const selectPayoutInProgressStatus = createSelector(
  getWalletState,
  getPayoutStateInProgress
);

export const selectPayoutFailedStatus = createSelector(
  getWalletState,
  getPayoutStateFailed
);
