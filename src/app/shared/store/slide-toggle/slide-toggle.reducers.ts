import * as ToggleActions from "./slide-toggle.actions";
import * as fromAdapter from "./slide-toggle.adapter";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IToggle } from "src/app/interfaces";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export interface ToggleState extends EntityState<IToggle> {
  selectAppToggleId: string | number | null;
}

const initialState: ToggleState = fromAdapter.adapter.getInitialState({
  selectAppToggleId: null,
});

export function reducer(
  state = initialState,
  action: ToggleActions.ToggleActions
): ToggleState {
  switch (action.type) {
    case ToggleActions.ADD_COMPONENT_TOGGLE:
      return fromAdapter.adapter.setAll(action.payload.componentToggle, state);
    case ToggleActions.FETCH_TOGGLE:
      return Object.assign({
        ...state,
        selectAppToggleId: action.payload.appToggleId,
      });
    case ToggleActions.UPSERT_MANY_TOGGLE:
      return fromAdapter.adapter.upsertMany(action.payload, state);
    case ToggleActions.UPSERT_TOGGLE:
      return fromAdapter.adapter.upsertOne(action.payload, state);
    default: {
      return state;
    }
  }
}

const getSelectedAppToggleId = (state: ToggleState) => state.selectAppToggleId;

export const getAppToggleState = createFeatureSelector<ToggleState>(
  "toggleState"
);

export const selectAppToggleEntities = createSelector(
  getAppToggleState,
  fromAdapter.selectAppToggleEntities
);

export const selectCurrentAppToggleId = createSelector(
  getAppToggleState,
  getSelectedAppToggleId
);

export const selectAllToggles = createSelector(
  getAppToggleState,
  fromAdapter.selectAllAppToggle
);

export const selectCurrentSlideToggle = createSelector(
  selectAppToggleEntities,
  selectCurrentAppToggleId,
  (appToggleEntities, appToggleId) => appToggleEntities[appToggleId]
);
