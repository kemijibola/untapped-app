import { Action } from "@ngrx/store";
import { IOrder, PaymentProcessor } from "../../../interfaces";

export const CREATE_ORDER = "CREATE_ORDER";
export const CREATE_ORDER_SUCCESSFUL = "CREATE_ORDER_SUCCESSFUL";
export const VERIFY_ORDER = "VERIFY_ORDER";
export const VERIFY_ORDER_SUCCESS = "VERIFY_ORDER_SUCCESS";

export class CreateOrder implements Action {
  readonly type = CREATE_ORDER;
  constructor(public payload: { newOrder: IOrder }) {}
}

export class CreateOrderSuccessful implements Action {
  readonly type = CREATE_ORDER_SUCCESSFUL;
  constructor(public payload: IOrder) {}
}

export class VerifyOrder implements Action {
  readonly type = VERIFY_ORDER;
  constructor(
    public payload: {
      orderId: string;
      reference: string;
      processor: PaymentProcessor;
    }
  ) {}
}

export class VerifyOrderSuccess implements Action {
  readonly type = VERIFY_ORDER_SUCCESS;
  constructor(public payload: IOrder) {}
}
export type OrderActions =
  | CreateOrder
  | CreateOrderSuccessful
  | VerifyOrder
  | VerifyOrderSuccess;
