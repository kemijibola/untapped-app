import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducers";
import * as UserFilterActions from "./user-filter.action";
import { UserCategoryService } from "src/app/services/user-category.service";
import { map, catchError, concatMap, mergeMap } from "rxjs/operators";
import {
  IResult,
  UserFilterCategory,
  AppNotificationKey,
} from "src/app/interfaces";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../../store/global/notification/notification.action";
import { ProfileService } from "src/app/services/profile.service";

@Injectable()
export class UserFilterEffect {
  fetchHighestTalents = createEffect(() =>
    this.actions$.pipe(
      ofType(UserFilterActions.FETCH_ALL_USERS),
      concatMap((action: UserFilterActions.FetchAllUsers) =>
        this.userCategoryService
          .getUserFilterCategoryByReportType({
            type: action.payload.queryParams.type,
            searchText: action.payload.queryParams.searchText,
            categoryId: action.payload.queryParams.categoryId,
            userTypeId: action.payload.queryParams.userTypeId,
          })
          .pipe(
            mergeMap((resp: IResult<UserFilterCategory[]>) => [
              new UserFilterActions.SetAllUsers({
                users: resp.data,
              }),
              new UserFilterActions.FetchAllUsersSuccess(),
            ]),
            catchError((respError: HttpErrorResponse) => {
              return respError.status === 404
                ? of(new UserFilterActions.FetchAllUsersNoop())
                : of(new UserFilterActions.FetchAllUsersError());
            })
          )
      )
    )
  );

  likeTalent = createEffect(() =>
    this.actions$.pipe(
      ofType(UserFilterActions.LIKE_TALENT),
      concatMap((action: UserFilterActions.LikeTalent) =>
        this.profileService.likeTalent(action.payload.user.user).pipe(
          map(
            (resp: IResult<boolean>) =>
              new UserFilterActions.LikeTalentSuccess({
                user: action.payload.user,
              })
          ),
          catchError((respError: HttpErrorResponse) => {
            return of(
              new UserFilterActions.LikeTalentError({
                user: action.payload.user,
                likedBy: action.payload.likedBy,
              })
            );
          })
        )
      )
    )
  );

  unLikeTalent = createEffect(() =>
    this.actions$.pipe(
      ofType(UserFilterActions.UNLIKE_TALENT),
      concatMap((action: UserFilterActions.UnLikeTalent) =>
        this.profileService.unLikeTalent(action.payload.user.user).pipe(
          map(
            (resp: IResult<boolean>) =>
              new UserFilterActions.UnLikeTalentSuccess({
                user: action.payload.user,
              })
          ),
          catchError((respError: HttpErrorResponse) => {
            return of(
              new UserFilterActions.UnLikeTalentError({
                user: action.payload.user,
                unLikedBy: action.payload.unLikedBy,
              })
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userCategoryService: UserCategoryService,
    private profileService: ProfileService,
    private store: Store<fromApp.AppState>
  ) {}
}
