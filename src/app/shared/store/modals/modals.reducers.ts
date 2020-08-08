import {
  AppModal,
  ModalDisplay,
  ModalViewModel,
  ModalContent,
  IModal,
  NavigationData,
  MagnifierData,
} from "src/app/interfaces/shared/modal";
import * as ModalsActions from "./modals.actions";
import { MediaType } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./modals.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ModalState extends EntityState<AppModal> {
  activeModal: IModal | null;
  navigationData: NavigationData | null;
  magnifierData: MagnifierData | null;
  showMagnifier: boolean | null;
  selectAppModalId: string | number | null;
}

const initialState: ModalState = fromAdapter.adapter.getInitialState({
  activeModal: null,
  navigationData: null,
  magnifierData: null,
  showMagnifier: null,
  selectAppModalId: null,
});

export function reducer(
  state = initialState,
  action: ModalsActions.ModalsActions
): ModalState {
  switch (action.type) {
    case ModalsActions.ADD_COMPONENT_MODALS:
      return fromAdapter.adapter.setAll(action.payload.appModals, state);
    case ModalsActions.ADD_COMPONENT_MODAL:
      return fromAdapter.adapter.setOne(action.payload.componentModal, state);
    case ModalsActions.UPSERT_MODAL:
      return fromAdapter.adapter.upsertOne(action.payload, state);
    case ModalsActions.FETCH_APP_MODAL:
      return Object.assign({
        ...state,
        selectAppModalId: action.payload.appModalId,
      });
    case ModalsActions.DESTROY_MODAL:
      return fromAdapter.adapter.removeOne(action.payload.id, state);
    case ModalsActions.DESTROY_MODALS:
      return fromAdapter.adapter.removeMany(action.payload.ids, state);
    case ModalsActions.DESTROY_ALL:
      return fromAdapter.adapter.removeAll({
        ...state,
        selectAppModalId: null,
      });
    case ModalsActions.SET_CURRENT_MODAL:
      return Object.assign({
        ...state,
        activeModal: action.payload,
      });
    case ModalsActions.SET_NAVIGATION_PROPERTIES:
      return Object.assign({
        ...state,
        navigationData: action.payload,
      });
    case ModalsActions.SET_MAGNIFIER_DATA:
      return Object.assign({
        ...state,
        magnifierData: action.payload,
      });
    case ModalsActions.TOGGLE_MAGNIFIER:
      return Object.assign({
        ...state,
        showMagnifier: action.payload,
      });
    case ModalsActions.RESET_CURRENT_MODAL:
      return Object.assign({
        ...state,
        activeModal: null,
      });
    default: {
      return state;
    }
  }
}

const getSelectedAppModalId = (state: ModalState) => state.selectAppModalId;

const getSelectedActiveModal = (state: ModalState) => state.activeModal;

const getSelectedMagnifiedData = (state: ModalState) => state.magnifierData;

const getSelectedNavigationData = (state: ModalState) => state.navigationData;

const getSelectedShowMagnifier = (state: ModalState) => state.showMagnifier;

export const getAppModalState = createFeatureSelector<ModalState>("modalState");

export const selectAppModalsIds = createSelector(
  getAppModalState,
  fromAdapter.selectAppModalsIds
);

export const selectAppModalEntities = createSelector(
  getAppModalState,
  fromAdapter.selectAppModalsEntities
);

export const selectAllAppabs = createSelector(
  getAppModalState,
  fromAdapter.selectAllAppModals
);
export const appTabCount = createSelector(
  getAppModalState,
  fromAdapter.appModalCount
);

export const selectCurrentAppModalId = createSelector(
  getAppModalState,
  getSelectedAppModalId
);

export const selectCurrentActiveModal = createSelector(
  getAppModalState,
  getSelectedActiveModal
);

export const selectCurrentNavigationData = createSelector(
  getAppModalState,
  getSelectedNavigationData
);

export const selectCurrentMagnifiedData = createSelector(
  getAppModalState,
  getSelectedMagnifiedData
);

export const selectCurrentShowMagnifier = createSelector(
  getAppModalState,
  getSelectedShowMagnifier
);

export const selectCurrentModal = createSelector(
  selectAppModalEntities,
  selectCurrentAppModalId,
  (appModalEntities, appModalId) => appModalEntities[appModalId]
);
