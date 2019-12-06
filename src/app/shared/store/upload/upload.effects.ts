import { Actions, ofType, Effect } from "@ngrx/effects";
import * as ErrorActions from "./../../../store/global/error/error.actions";
import { switchMap, map, catchError } from "rxjs/operators/";
import { Injectable } from "@angular/core";
import { UploadService } from "src/app/services/upload.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as UploadActions from "./upload.actions";
import { IResult, SignedUrl } from "src/app/interfaces";

@Injectable()
export class UploadEffect {
  @Effect()
  getPresignedUrl = this.actions$
    .pipe(ofType(UploadActions.GET_PRESIGNED_URL))
    .switchMap((action: UploadActions.GetPresignedUrl) => {
      return this.uploadService.getPresignedUrl(action.payload.preSignRequest);
    })
    .pipe(
      map((res: IResult<SignedUrl>) => {
        return {
          type: UploadActions.SET_PRESIGNED_URL,
          payload: {
            action: res.data.action,
            presignedUrl: res.data.presignedUrl
          }
        };
      })
    );

  @Effect()
  uploadFiles = this.actions$
    .pipe(ofType(UploadActions.UPLOAD_FILES))
    .switchMap((action: UploadActions.UploadFiles) => {
      console.log(action.payload);
      return this.uploadService.s3Upload(action.payload);
    })
    .pipe(
      map(resp => {
        console.log(resp);
        return {
          type: UploadActions.CLOUD_UPLOAD_SUCCESS
        };
      })
    );

  constructor(
    private actions$: Actions,
    private uploadService: UploadService,
    private store: Store<fromApp.AppState>
  ) {}
}
