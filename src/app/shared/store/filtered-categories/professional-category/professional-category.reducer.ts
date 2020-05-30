import * as ProfessionalCategoryActions from "./professional-category.actions";
import { UserFilterCategory } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./professional-category.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ProfessionalFilterState
  extends EntityState<UserFilterCategory> {
  selectedProfessionalFilterId: string | number | null;
}

const initialState: ProfessionalFilterState = fromAdapter.adapter.getInitialState(
  {
    selectedProfessionalFilterId: null,
  }
);

export function reducer(
  state = initialState,
  action: ProfessionalCategoryActions.ProfessionalCategoryActions
): ProfessionalFilterState {
  switch (action.type) {
    case ProfessionalCategoryActions.FETCH_ALL_PROFESSIONAL_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.professionals, state);
    case ProfessionalCategoryActions.FETCH_PROFESSIONAL:
      return Object.assign({
        ...state,
        selectedProfessionalFilterId: action.payload.id,
      });
    default: {
      return state;
    }
  }
}

export const getselectedProfessionalId = (state: ProfessionalFilterState) =>
  state.selectedProfessionalFilterId;

export const getProfessionalState = createFeatureSelector<
  ProfessionalFilterState
>("professionalFilterState");

export const selectProfessionalIds = createSelector(
  getProfessionalState,
  fromAdapter.selectProfessionalIds
);

export const selectProfessionalEntities = createSelector(
  getProfessionalState,
  fromAdapter.selectProfessionalEntities
);

export const selectProfessionals = createSelector(
  getProfessionalState,
  fromAdapter.selectAllProfessionals
);
export const professionalCount = createSelector(
  getProfessionalState,
  fromAdapter.professionalCount
);

export const selectCurrentProfessionalId = createSelector(
  getProfessionalState,
  getselectedProfessionalId
);

export const selectCurrentProfessional = createSelector(
  selectProfessionalEntities,
  selectCurrentProfessionalId,
  (professionalEntities, professionalId) => professionalEntities[professionalId]
);
