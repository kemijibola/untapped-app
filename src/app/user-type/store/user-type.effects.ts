import { Action } from "@ngrx/store";
import { mergeMap, catchError, switchMap } from "rxjs/operators";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as UserTypeActions from "./user-type.actions";
import { IUserType, IResult } from "src/app/interfaces";
import { UserTypeService } from "../../services/user-type.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { of } from "rxjs";
import { Observable } from "rxjs";
import * as GlobalErrorActions from "../../store/global/error/error.actions";

@Injectable()
export class UserTypeEffects {
  @Effect()
  fetchRoles = this.actions$.pipe(
    ofType(UserTypeActions.FETCH_USER_TYPES),
    switchMap(() =>
      this.userTypeService.getUserTypes().pipe(
        mergeMap((resp: IResult<IUserType[]>) => {
          console.log(resp);
          let preSelectedUserType: IUserType = {
            _id: "",
            name: "",
            description: ""
          };
          for (const userType of resp.data) {
            if (userType.name === "Talent") {
              preSelectedUserType = userType;
            }
          }
          return [
            {
              type: UserTypeActions.FETCH_USER_TYPES_SUCCESS,
              payload: resp.data
            },
            {
              type: UserTypeActions.SET_SELECTED_USER_TYPE,
              payload: preSelectedUserType
            }
          ];
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

  // @Effect()
  // fetchRoles = this.actions$
  //   .pipe(ofType(UserTypeActions.FETCH_USER_TYPES))
  //   .switchMap(() => {
  //     return this.userTypeService.getUserTypes();
  //   })
  //   .pipe(
  //     mergeMap((resp: IResult<IUserType[]>) => {
  //       let preSelectedUserType = '';
  //       for (const userType of resp.data) {
  //         if (userType.name === 'Talent') {
  //           preSelectedUserType = userType._id;
  //         }
  //       }
  //       return [
  //         {
  //           type: UserTypeActions.SET_USER_TYPES,
  //           payload: resp.data
  //         },
  //         {
  //           type: UserTypeActions.SET_SELECTED_USER_TYPE,
  //           payload: preSelectedUserType
  //         }
  //       ];
  //     })
  //   );
  constructor(
    private actions$: Actions,
    private userTypeService: UserTypeService
  ) {}
}
