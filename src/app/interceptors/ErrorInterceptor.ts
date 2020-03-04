import { Injectable } from "@angular/core";
import { catchError, retry } from "rxjs/operators";
import { throwError, Observable, of } from "rxjs";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from "@angular/common/http";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as ErrorActions from "../store/global/error/error.actions";
import * as AuthActions from "../account/store/auth.actions";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        if (!navigator.onLine) {
          console.log("No internet connection");
          this.store.dispatch(
            new ErrorActions.AddGlobalError({
              response_code: 0,
              response_message:
                "You are currently not connected to the internet"
            })
          );
        }

        if (this.router.url !== "/account/signin" && error.status === 401) {
          this.store.dispatch(new AuthActions.DeleteAutData());
          this.authService.removeItem("authData").subscribe((val: boolean) => {
            if (val) {
              return this.router.navigate(["/account/signin"]);
              // return of(undefined);
            }
          });
        } else {
          this.store.dispatch(new ErrorActions.AddGlobalError(error));
          return of(undefined);
        }
      })
    );
  }
}
