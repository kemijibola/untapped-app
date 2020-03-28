import { map, switchMap, catchError } from "rxjs/operators";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as UserActions from "./user.actions";
import { UserService } from "src/app/services/user.service";
import { IResult, IUser } from "src/app/interfaces";
import { of } from "rxjs";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";

@Injectable()
export class UserEffects {
  @Effect()
  fetchUser = this.actions$.pipe(
    ofType(UserActions.FETCH_USER),
    switchMap((action: UserActions.FetchUser) =>
      this.userService.findUserById(action.payload.id).pipe(
        map((resp: IResult<IUser>) => {
          return {
            type: UserActions.SET_USER,
            payload: resp.data
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
