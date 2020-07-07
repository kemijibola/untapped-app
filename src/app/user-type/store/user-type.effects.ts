import { Action } from "@ngrx/store";
import { mergeMap, catchError, concatMap, map, tap } from "rxjs/operators";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as UserTypeActions from "./user-type.actions";
import { IUserType, IResult, AppNotificationKey } from "src/app/interfaces";
import { UserTypeService } from "../../services/user-type.service";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../store/global/notification/notification.action";

@Injectable()
export class UserTypeEffects {
  fetchUserTypes = createEffect(() =>
    this.actions$.pipe(
      ofType(UserTypeActions.FETCH_USER_TYPES),
      concatMap(() =>
        this.userTypeService.getUserTypes().pipe(
          mergeMap((response: IResult<IUserType[]>) => [
            new UserTypeActions.SetUserTypes({
              userTypes: response.data,
            }),
            new UserTypeActions.FetchUserType({
              userTypeId: response.data.filter((x) => x.name === "Talent")[0]
                ._id,
            }),
            new UserTypeActions.FetchUserTypesSucess(),
          ]),
          catchError((respError: HttpErrorResponse) =>
            of(new UserTypeActions.FetchUserTypesError())
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
