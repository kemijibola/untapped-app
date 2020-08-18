import { Action } from "@ngrx/store";
import { IOrder, PaymentProcessor } from "../../../interfaces";

export const CREATE_ORDER = "CREATE_ORDER";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const CREATE_ORDER_SUCCESSFUL = "CREATE_ORDER_SUCCESSFUL";
export const CREATE_ORDER_CANCELLED = "CREATE_ORDER_CANCELLED";
export const VERIFY_ORDER = "VERIFY_ORDER";
export const VERIFY_ORDER_SUCCESS = "VERIFY_ORDER_SUCCESS";
export const VERIFY_ORDER_FAILED = "VERIFY_ORDER_FAILED";

export class CreateOrder implements Action {
  readonly type = CREATE_ORDER;
  constructor(public payload: { newOrder: IOrder }) {}
}

export class CreateOrderSuccessful implements Action {
  readonly type = CREATE_ORDER_SUCCESSFUL;
  constructor(public payload: IOrder) {}
}

export class CreateOrderFailed implements Action {
  readonly type = CREATE_ORDER_FAILED;
}

export class VerifyOrderFailed implements Action {
  readonly type = VERIFY_ORDER_FAILED;
}
export class CreateOrderCancelled implements Action {
  readonly type = CREATE_ORDER_CANCELLED;
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
  | VerifyOrderSuccess
  | VerifyOrderFailed
  | CreateOrderFailed
  | CreateOrderCancelled;
