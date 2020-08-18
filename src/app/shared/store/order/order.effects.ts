import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { OrderService } from "src/app/services/order.service";
import * as fromApp from "../../../store/app.reducers";
import { Store } from "@ngrx/store";
import * as OrderActions from "./order.actions";
import { concatMap, map, catchError, mergeMap } from "rxjs/operators";
import { IResult, IOrder, AppNotificationKey } from "src/app/interfaces";
import { of } from "rxjs";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class OrderEffect {
  createOrder = createEffect(() =>
    this.action$.pipe(
      ofType(OrderActions.CREATE_ORDER),
      concatMap((action: OrderActions.CreateOrder) =>
        this.orderService.createOrder(action.payload.newOrder).pipe(
          map(
            (resp: IResult<IOrder>) =>
              new OrderActions.CreateOrderSuccessful(resp.data)
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
          )
        )
      )
    )
  );

  verifyOrder = createEffect(() =>
    this.action$.pipe(
      ofType(OrderActions.VERIFY_ORDER),
      concatMap((action: OrderActions.VerifyOrder) =>
        this.orderService
          .verifyOrder(
            action.payload.orderId,
            action.payload.reference,
            action.payload.processor
          )
          .pipe(
            mergeMap((resp: IResult<IOrder>) => {
              return [
                new OrderActions.VerifyOrderSuccess(resp.data),
                new NotificationActions.AddSuccess({
                  key: AppNotificationKey.success,
                  code: 200,
                  message: "Payment successful",
                }),
              ];
            }),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                }),
                new OrderActions.VerifyOrderFailed()
              )
            )
          )
      )
    )
  );
  constructor(
    private action$: Actions,
    private orderService: OrderService,
    private store: Store<fromApp.AppState>
  ) {}
}
