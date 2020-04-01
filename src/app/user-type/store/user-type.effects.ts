import { Action } from "@ngrx/store";
import {
  mergeMap,
  catchError,
  switchMap,
  concatMap,
  map,
  tap
} from "rxjs/operators";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as UserTypeActions from "./user-type.actions";
import { IUserType, IResult } from "src/app/interfaces";
import { UserTypeService } from "../../services/user-type.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { of } from "rxjs";
import { Observable } from "rxjs";
import * as GlobalErrorActions from "../../store/global/error/error.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { AppError } from "src/app/store/global/error/error.reducers";

@Injectable()
export class UserTypeEffects {
  fetchUserTypes = createEffect(() =>
    this.actions$.pipe(
      ofType(UserTypeActions.FETCH_USER_TYPES),
      switchMap(() =>
        this.userTypeService.getUserTypes().pipe(
          mergeMap((response: IResult<IUserType[]>) => [
            new UserTypeActions.FetchUserTypesSucess({
              userTypes: response.data
            }),
            new UserTypeActions.FetchUserType({
              userTypeId: response.data.filter(x => x.name === "Talent")[0]._id
            })
          ]),
          catchError((respError: HttpErrorResponse) =>
            of(
              new UserTypeActions.FetchUserTypesError({
                errorCode: !navigator.onLine
                  ? respError.error.response_code
                  : 0,
                errorMessage: !navigator.onLine
                  ? respError.error.response_message
                  : "No internet connection. Please connect to the internet and try again."
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userTypeService: UserTypeService
  ) {}
}
