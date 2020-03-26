import { createSelector } from "@ngrx/store";
import * as fromModal from "./modals.reducers";
import * as fromApp from "../../../store/app.reducers";

const activeModal = (state: fromApp.AppState) => state.modals;
const navigationData = (state: fromApp.AppState) => state.modals;
const magnifiedData = (state: fromApp.AppState) => state.modals;
const showMagnifier = (state: fromApp.AppState) => state.modals;

export const selectActiveModal = createSelector(
  activeModal,
  (state: fromModal.State) => state.activeModal
);

export const selectNavigationData = createSelector(
  navigationData,
  (state: fromModal.State) => state.navigationData
);

export const selectMagnifiedData = createSelector(
  magnifiedData,
  (state: fromModal.State) => state.magnifierData
);

export const selectShowMagnifier = createSelector(
  showMagnifier,
  (state: fromModal.State) => state.showMagnifier
);
