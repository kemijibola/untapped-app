import * as ErrorActions from './../../../store/global/error/error.actions';
import { switchMap, map, catchError } from 'rxjs/operators/';
import { Injectable } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as UploadActions from './upload.actions';
import { IResult, IPresignFileModel } from 'src/app/interfaces';

@Injectable()
export class UploadEffect {
  @Effect()
  getPresignedUrl = this.actions$
    .pipe(ofType(UploadActions.GET_PRESIGNED_URL))
    .switchMap((action: UploadActions.GetPresignedUrl) => {
      return this.uploadService.getPresignedUrl(action.payload);
    })
    .pipe(
      map(res => {
        return {
          type: UploadActions.SET_PRESIGNED_URL,
          payload: res.data
        };
      }),
      catchError((error, caught) => {
        this.store.dispatch(new ErrorActions.ExceptionOccurred(error));
        return caught;
      })
    );

  constructor(
    private actions$: Actions,
    private uploadService: UploadService,
    private store: Store<fromApp.AppState>
  ) {}
}
