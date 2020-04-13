import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { switchMap, map, catchError, concatMap } from "rxjs/operators/";
import { Injectable } from "@angular/core";
import { UploadService } from "src/app/services/upload.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as UploadActions from "./upload.actions";
import { IResult, SignedUrl, AppNotificationKey } from "src/app/interfaces";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";

@Injectable()
export class UploadEffect {
  getPresignedUrl = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.GET_PRESIGNED_URL),
      concatMap((action: UploadActions.GetPresignedUrl) =>
        this.uploadService.getPresignedUrl(action.payload.preSignRequest).pipe(
          map(
            (res: IResult<SignedUrl>) =>
              new UploadActions.SetPresignedUrl(res.data)
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

  uploadFiles = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.UPLOAD_FILES),
      switchMap((action: UploadActions.UploadFiles) =>
        this.uploadService.s3Upload(action.payload).pipe(
          map((val: any) => new UploadActions.CloudUploadSuccess()),
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

  constructor(
    private actions$: Actions,
    private uploadService: UploadService,
    private store: Store<fromApp.AppState>
  ) {}
}
