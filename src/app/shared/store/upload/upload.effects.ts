import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import * as ErrorActions from "./../../../store/global/error/error.actions";
import { switchMap, map, catchError } from "rxjs/operators/";
import { Injectable } from "@angular/core";
import { UploadService } from "src/app/services/upload.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as UploadActions from "./upload.actions";
import { IResult, SignedUrl } from "src/app/interfaces";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class UploadEffect {
  getPresignedUrl = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.GET_PRESIGNED_URL),
      switchMap((action: UploadActions.GetPresignedUrl) =>
        this.uploadService.getPresignedUrl(action.payload.preSignRequest).pipe(
          map(
            (res: IResult<SignedUrl>) =>
              new UploadActions.SetPresignedUrl(res.data)
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new UploadActions.GetPresignedUrlError({
                errorCode: respError.error.response_code || -1,
                errorMessage:
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
              new UploadActions.UploadFilesError({
                errorCode: respError.error.response_code || -1,
                errorMessage:
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
