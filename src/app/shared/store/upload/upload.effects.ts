import { Actions, ofType, Effect } from "@ngrx/effects";
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

@Injectable()
export class UploadEffect {
  @Effect()
  getPresignedUrl = this.actions$.pipe(
    ofType(UploadActions.GET_PRESIGNED_URL),
    switchMap((action: UploadActions.GetPresignedUrl) =>
      this.uploadService.getPresignedUrl(action.payload.preSignRequest).pipe(
        map((res: IResult<SignedUrl>) => {
          return {
            type: UploadActions.SET_PRESIGNED_URL,
            payload: {
              action: res.data.action,
              presignedUrl: res.data.presignedUrl
            }
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

  @Effect()
  uploadFiles = this.actions$.pipe(
    ofType(UploadActions.UPLOAD_FILES),
    switchMap((action: UploadActions.UploadFiles) =>
      this.uploadService.s3Upload(action.payload).pipe(
        map((val: any) => {
          return {
            type: UploadActions.CLOUD_UPLOAD_SUCCESS
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

  constructor(
    private actions$: Actions,
    private uploadService: UploadService,
    private store: Store<fromApp.AppState>
  ) {}
}
