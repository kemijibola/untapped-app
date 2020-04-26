import { IService } from "../../../interfaces";
import * as ServiceActions from "./service.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./service.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ServiceState extends EntityState<IService> {
  selectedServiceId: string | number | null;
}

const initialState: ServiceState = fromAdapter.adapter.getInitialState({
  selectedServiceId: null,
});

export function reducer(
  state = initialState,
  action: ServiceActions.ServiceActions
): ServiceState {
  switch (action.type) {
    case ServiceActions.FETCH_SERVICE_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.services, state);
    case ServiceActions.FETCH_SERVICE:
      return Object.assign({
        ...state,
        selectedServiceId: action.payload.serviceId,
      });
    default:
      return state;
  }
}

export const getSelectedServiceId = (state: ServiceState) =>
  state.selectedServiceId;

export const getServiceState = createFeatureSelector<ServiceState>(
  "serviceState"
);

export const selectServiceIds = createSelector(
  getServiceState,
  fromAdapter.selectServiceIds
);

export const selectServiceEntities = createSelector(
  getServiceState,
  fromAdapter.selectServiceEntities
);

export const selectAllServices = createSelector(
  getServiceState,
  fromAdapter.selectAllServices
);
export const serviceCount = createSelector(
  getServiceState,
  fromAdapter.serviceCount
);

export const selectCurrentServiceId = createSelector(
  getServiceState,
  getSelectedServiceId
);

export const selectCurrentService = createSelector(
  selectServiceEntities,
  selectCurrentServiceId,
  (serviceEntities, serviceId) => serviceEntities[serviceId]
);
