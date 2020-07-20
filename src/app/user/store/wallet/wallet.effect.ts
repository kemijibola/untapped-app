import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { WalletService } from "src/app/services/wallet.service";
import * as fromApp from "../../../store/app.reducers";
import * as WalletActions from "./wallet.actions";
import { of, pipe } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import { IWallet } from "src/app/interfaces/account/wallet";
import { mergeMap, concatMap, catchError, map } from "rxjs/operators";
import { AppNotificationKey, IResult } from "src/app/interfaces";
import { Injectable } from "@angular/core";

@Injectable()
export class WalletEffect {
  createWallet = createEffect(() =>
    this.action$.pipe(
      ofType(WalletActions.CREATE_WALLET),
      concatMap((action: WalletActions.CreateWallet) =>
        this.walletService.createWallet(action.payload.pin).pipe(
          mergeMap((resp: IResult<IWallet>) => {
            return [
              new WalletActions.CreateWalletSuccess({ walletData: resp.data }),
              new NotificationActions.AddSuccess({
                key: AppNotificationKey.success,
                code: 200,
                message: "Wallet created successfully",
              }),
            ];
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new WalletActions.CreateWalletError()
            )
          )
        )
      )
    )
  );

  fetchWallet = createEffect(() =>
    this.action$.pipe(
      ofType(WalletActions.FETCH_WALLET),
      concatMap((action: WalletActions.FetchWallet) =>
        this.walletService.fetchUserWalletData().pipe(
          map(
            (resp: IResult<IWallet>) =>
              new WalletActions.FetchWalletSuccess({ walletData: resp.data })
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new WalletActions.CreateWalletError()
            )
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private walletService: WalletService,
    private store: Store<fromApp.AppState>
  ) {}
}
