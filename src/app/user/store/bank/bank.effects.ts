import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TransactionService } from "src/app/services/transaction.service";
import * as fromApp from "../../../store/app.reducers";
import * as BankActions from "./bank.actions";
import { of, pipe } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import {
  IWallet,
  BankResponse,
  CreateAccountResponse,
  UserAccount,
} from "src/app/interfaces/account/wallet";
import { mergeMap, concatMap, catchError, map } from "rxjs/operators";
import { AppNotificationKey, IResult } from "src/app/interfaces";
import { Injectable } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Injectable()
export class BankEffect {
  fetchBanks = createEffect(() =>
    this.action$.pipe(
      ofType(BankActions.FETCH_BANKS),
      concatMap((action: BankActions.FetchBanks) =>
        this.transactionService.fetchBanks(action.payload.processor).pipe(
          map(
            (resp: BankResponse) =>
              new BankActions.FetchBanksSuccess({ banks: resp.data })
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

  fetchUserAccountDetails = createEffect(() =>
    this.action$.pipe(
      ofType(BankActions.FETCH_USER_ACCOUNT),
      concatMap((action: BankActions.FetchUserAccount) =>
        this.userService.fetchUserAccountDetails().pipe(
          map(
            (resp: IResult<UserAccount>) =>
              new BankActions.FetchUserAccountSuccess({
                userAccount: resp.data,
              })
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new BankActions.FetchUserAccountError()
              // new NotificationActions.AddError({
              //   key: AppNotificationKey.error,
              //   code: respError.error.response_code || -1,
              //   message:
              //     respError.error.response_message || "No Internet connection",
              // })
            )
          )
        )
      )
    )
  );

  setUpUserAccount = createEffect(() =>
    this.action$.pipe(
      ofType(BankActions.SETUP_BANK_DETAILS),
      concatMap((action: BankActions.SetUpBankDetails) =>
        this.transactionService
          .setUpUserAccount(
            action.payload.processor,
            action.payload.accountNumber,
            action.payload.bankCode
          )
          .pipe(
            mergeMap((resp: CreateAccountResponse) => {
              return [
                new BankActions.SetUpBankDetailsSuccess({
                  userAccount: resp.data,
                }),
                new NotificationActions.AddSuccess({
                  key: AppNotificationKey.success,
                  code: 200,
                  message: "Account details saved successfully",
                }),
              ];
            }),
            catchError((respError: HttpErrorResponse) =>
              of(
                new BankActions.SetUpBankDetailsError(),
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private action$: Actions,
    private transactionService: TransactionService,
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}
}
