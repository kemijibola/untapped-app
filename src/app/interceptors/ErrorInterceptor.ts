import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as ErrorActions from '../store/global/error/error.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!navigator.onLine) {
          console.log('No internet connection');
          this.store.dispatch(
            new ErrorActions.AddGlobalError({
              response_code: 0,
              response_message:
                'You are currently not connected to the internet'
            })
          );
        }
        if (error.status === 401) {
          // refresh token
        } else {
          // throwError(error.error.response_message);
          this.store.dispatch(new ErrorActions.AddGlobalError(error));
          return of(undefined);
        }
      })
    );
  }
}
