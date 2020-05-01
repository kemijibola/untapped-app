import { map, concatMap, catchError } from "rxjs/operators";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as UserActions from "./user.actions";
import { UserService } from "src/app/services/user.service";
import { IResult, IUser, AppNotificationKey } from "src/app/interfaces";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";

@Injectable()
export class UserEffects {
  @Effect()
  fetchUser = this.actions$.pipe(
    ofType(UserActions.FETCH_USER),
    concatMap((action: UserActions.FetchUser) =>
      this.userService.findUserById(action.payload.id).pipe(
        map((resp: IResult<IUser>) => {
          return {
            type: UserActions.SET_USER,
            payload: resp.data,
          };
        }),
        catchError((respError: HttpErrorResponse) =>
          of(
            new NotificationActions.AddError({
              key: AppNotificationKey.error,
              code: respError.error.response_code || -1,
              message:
                respError.error.response_message || "No Internet connection.",
            })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
