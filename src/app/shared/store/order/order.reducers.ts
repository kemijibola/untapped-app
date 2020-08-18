import { OutboundState } from "./../../Util";
import { IOrder } from "src/app/interfaces";
import * as OrderActions from "./order.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./order.adapter";

export interface OrderState extends EntityState<IOrder> {
  order: IOrder | null;
  orderStatus: OutboundState;
}

const initialState: OrderState = fromAdapter.adapter.getInitialState({
  order: null,
  orderStatus: OutboundState.initiated,
});

export function reducer(
  state = initialState,
  action: OrderActions.OrderActions
): OrderState {
  switch (action.type) {
    case OrderActions.CREATE_ORDER:
      return Object.assign({
        ...state,
        orderStatus: OutboundState.inprogress,
      });
    case OrderActions.CREATE_ORDER_SUCCESSFUL:
      return Object.assign({
        ...state,
        order: action.payload,
      });
    case OrderActions.CREATE_ORDER_CANCELLED:
      return Object.assign({
        ...state,
        orderStatus: OutboundState.completed,
      });
    case OrderActions.VERIFY_ORDER_SUCCESS:
      return Object.assign({
        ...state,
        order: action.payload,
        orderStatus: OutboundState.completed,
      });
    case OrderActions.VERIFY_ORDER_FAILED:
      return Object.assign({
        ...state,
        orderStatus: OutboundState.failed,
      });
    default: {
      return state;
    }
  }
}

export const getOrderState = createFeatureSelector<OrderState>("orderState");

const getSelectedCurrentOrder = (state: OrderState) => state.order;

const getSaveCompleted = (state: OrderState): boolean =>
  state.orderStatus === OutboundState.completed;

const getSaveInProgress = (state: OrderState): boolean =>
  state.orderStatus === OutboundState.inprogress;

const getSaveInitiated = (state: OrderState): boolean =>
  state.orderStatus === OutboundState.initiated;

const getFailedStatus = (state: OrderState): boolean =>
  state.orderStatus === OutboundState.failed;

export const selectCurrentOrder = createSelector(
  getOrderState,
  getSelectedCurrentOrder
);

export const selectSaveCompletedStatus = createSelector(
  getOrderState,
  getSaveCompleted
);

export const selectSaveInitiatedStatus = createSelector(
  getOrderState,
  getSaveInitiated
);

export const selectSaveInProgressStatus = createSelector(
  getOrderState,
  getSaveInProgress
);

export const selectSaveFailedStatus = createSelector(
  getOrderState,
  getFailedStatus
);
