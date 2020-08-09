import { UserAccount } from "./../../../interfaces/account/wallet";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./bank.adapter";
import * as BankActions from "./bank.actions";
import { Bank } from "src/app/interfaces/account/wallet";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OutboundState } from "src/app/shared/Util";

export interface BankState extends EntityState<Bank> {
  selectedBankId: string | number | null;
  userAccount: UserAccount | null;
  accountSetupState: OutboundState;
}

const initialState: BankState = fromAdapter.adapter.getInitialState({
  selectedBankId: null,
  userAccount: null,
  accountSetupState: OutboundState.initiated,
});

export function bankReducer(
  state = initialState,
  action: BankActions.BankActions
): BankState {
  switch (action.type) {
    case BankActions.FETCH_BANKS_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.banks, state);
    case BankActions.SETUP_BANK_DETAILS_ERROR:
      return Object.assign({
        ...state,
        accountSetupState: OutboundState.failed,
      });
    case BankActions.SETUP_BANK_DETAILS:
      return Object.assign({
        ...state,
        accountSetupState: OutboundState.inprogress,
      });
    case BankActions.SETUP_BANK_DETAILS_SUCCESS:
      return Object.assign({
        ...state,
        accountSetupState: OutboundState.completed,
        userAccount: action.payload.userAccount,
      });
    case BankActions.FETCH_USER_ACCOUNT_SUCCESS:
      return Object.assign({
        ...state,
        userAccount: action.payload.userAccount,
      });
    case BankActions.SETUP_BANK_DETAILS_ERROR:
      return Object.assign({
        ...state,
        accountSetupState: OutboundState.failed,
      });
    case BankActions.FETCH_BANK:
      return Object.assign({
        ...state,
        selectedBankId: action.payload.bankId,
      });
    default: {
      return state;
    }
  }
}

export const getBankState = createFeatureSelector<BankState>("bankState");

export const getSelectedBankId = (state: BankState) => state.selectedBankId;
export const getUserAccount = (state: BankState) => state.userAccount;

const getSaveCompleted = (state: BankState): boolean =>
  state.accountSetupState === OutboundState.completed;

const getSaveInProgress = (state: BankState): boolean =>
  state.accountSetupState === OutboundState.inprogress;

const getSaveInitiated = (state: BankState): boolean =>
  state.accountSetupState === OutboundState.initiated;

const getFailedStatus = (state: BankState): boolean =>
  state.accountSetupState === OutboundState.failed;

export const selectBankeIds = createSelector(
  getBankState,
  fromAdapter.selectBankIds
);

export const selectBankEntities = createSelector(
  getBankState,
  fromAdapter.selectBankEntities
);

export const selectAllBanks = createSelector(
  getBankState,
  fromAdapter.selectAllBanks
);
export const bankCount = createSelector(getBankState, fromAdapter.bankCount);

export const selectCurrentBankId = createSelector(
  getBankState,
  getSelectedBankId
);

export const selectUserAccount = createSelector(getBankState, getUserAccount);

export const selectAccountSetUpCompletedStatus = createSelector(
  getBankState,
  getSaveCompleted
);

export const selectAccountSetUpInitiatedStatus = createSelector(
  getBankState,
  getSaveInitiated
);

export const selectAccountSetUpInProgressStatus = createSelector(
  getBankState,
  getSaveInProgress
);

export const selectAccountSetUpFailedStatus = createSelector(
  getBankState,
  getFailedStatus
);

export const selectCurrentBank = createSelector(
  selectBankEntities,
  selectCurrentBankId,
  (bankEntities, bankId) => bankEntities[bankId]
);
