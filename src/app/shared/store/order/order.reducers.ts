import { IOrder } from "src/app/interfaces";
import * as OrderActions from "./order.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./order.adapter";

export interface OrderState extends EntityState<IOrder> {
  order: IOrder | null;
}

const initialState: OrderState = fromAdapter.adapter.getInitialState({
  order: null,
});

export function reducer(
  state = initialState,
  action: OrderActions.OrderActions
): OrderState {
  switch (action.type) {
    case OrderActions.CREATE_ORDER_SUCCESSFUL:
      return Object.assign({
        ...state,
        order: action.payload,
      });
    case OrderActions.VERIFY_ORDER_SUCCESS:
      return Object.assign({
        ...state,
        order: action.payload,
      });
    default: {
      return state;
    }
  }
}

export const getOrderState = createFeatureSelector<OrderState>("orderState");

const getSelectedCurrentOrder = (state: OrderState) => state.order;

export const selectCurrentOrder = createSelector(
  getOrderState,
  getSelectedCurrentOrder
);
