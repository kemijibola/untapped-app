import { createSelector } from "@ngrx/store";
import * as fromModal from "./modals.reducers";
import * as fromApp from "../../../store/app.reducers";

const modals = (state: fromApp.AppState) => state.modals;
const activeModal = (state: fromApp.AppState) => state.modals;
const modal = (state: fromApp.AppState) => state.modals;

export const selectModals = createSelector(
  modals,
  (state: fromModal.State) => state.modals
);

export const selectActiveModal = createSelector(
  activeModal,
  (state: fromModal.State) => state.activeModal
);
