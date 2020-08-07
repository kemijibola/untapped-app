import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, concatMap, takeUntil } from "rxjs/operators/";
import { Injectable } from "@angular/core";
import { UploadService } from "src/app/services/upload.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as UploadActions from "./upload.actions";
import { IResult, SignedUrl, AppNotificationKey } from "src/app/interfaces";
import { of } from "rxjs";
import {
  HttpErrorResponse,
  HttpEventType,
  HttpEvent,
} from "@angular/common/http";
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
            of(new UploadActions.UploadThumbnailError())
          )
        )
      )
    )
  );

  getThumbnailPresignedUrl = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.GET_THUMBNAIL_PRESIGNED_URL),
      concatMap((action: UploadActions.GetThumbnailPresignedUrl) =>
        this.uploadService.getPresignedUrl(action.payload.preSignRequest).pipe(
          map(
            (res: IResult<SignedUrl>) =>
              new UploadActions.SetThumbnailPresignedUrl(res.data)
          ),
          catchError((respError: HttpErrorResponse) =>
            of(new UploadActions.UploadThumbnailError())
          )
        )
      )
    )
  );

  uploadThumbnailRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.UPLOAD_THUMBNAIL),
      concatMap((action: UploadActions.UploadThumbnail) =>
        this.uploadService.s3Upload(action.payload).pipe(
          map(
            (res: any) =>
              new UploadActions.UploadThumbnailSuccess({
                thumbnailUrl: action.payload[0].key,
              })
          ),
          catchError((respError: HttpErrorResponse) =>
            of(new UploadActions.UploadThumbnailError())
          )
        )
      )
    )
  );

  uploadRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.UPLOAD_FILES),
      concatMap((action: UploadActions.UploadFiles) =>
        this.uploadService.s3Upload(action.payload).pipe(
          map((val: any) => new UploadActions.UploadFilesSuccess()),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new UploadActions.UploadFilesError()
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

  private getActionFromHttpEvent(event: HttpEvent<any>) {
    console.log(event);
  }
}
