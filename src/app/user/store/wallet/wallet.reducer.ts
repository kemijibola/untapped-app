import { IProfile } from "src/app/interfaces";
import * as WalletActions from "./wallet.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./wallet.adapter";
import { OutboundState } from "src/app/shared/Util";
import { IWallet } from "src/app/interfaces/account/wallet";

export interface WalletState extends EntityState<IWallet> {
  userWallet: IWallet | null;
  walletState: OutboundState;
}

const initialState: WalletState = fromAdapter.adapter.getInitialState({
  userWallet: null,
  walletState: OutboundState.initiated,
});

export function walletReducer(
  state = initialState,
  action: WalletActions.WalletActions
): WalletState {
  switch (action.type) {
    case WalletActions.CREATE_WALLET_SUCCESS:
      return Object.assign({
        ...state,
        userWallet: { ...action.payload },
        walletState: OutboundState.completed,
      });
    case WalletActions.CREATE_WALLET:
      return Object.assign({
        ...state,
        walletState: OutboundState.inprogress,
      });
    case WalletActions.CREATE_WALLET_ERROR:
      return Object.assign({
        ...state,
        walletState: OutboundState.completed,
      });
    case WalletActions.FETCH_WALLET:
      return Object.assign({
        ...state,
        walletState: OutboundState.inprogress,
      });
    case WalletActions.FETCH_WALLET_SUCCESS:
      return Object.assign({
        ...state,
        userWallet: { ...action.payload },
        walletState: OutboundState.completed,
      });
    case WalletActions.FETCH_WALLET_ERROR:
      return Object.assign({
        ...state,
        walletState: OutboundState.failed,
      });
    default: {
      return state;
    }
  }
}

export const getWalletState = createFeatureSelector<WalletState>("walletState");

const getStateCompleted = (state: WalletState): boolean =>
  state.walletState === OutboundState.completed;

const getStateInProgress = (state: WalletState): boolean =>
  state.walletState === OutboundState.inprogress;

const getStateInitiated = (state: WalletState): boolean =>
  state.walletState === OutboundState.initiated;

const getStateFailed = (state: WalletState): boolean =>
  state.walletState === OutboundState.failed;

const getSelectedCurrentUserWallet = (state: WalletState) => state.userWallet;

export const selectCurrentUserWallet = createSelector(
  getWalletState,
  getSelectedCurrentUserWallet
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
