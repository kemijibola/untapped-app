import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../account/store/auth.reducers";
import { selectUserData } from "../account/store/auth.selectors";
import { IAuthData } from "../interfaces";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string;
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.useHeader(req.url)) {
      return this.store
        .select("auth")
        .take(1)
        .switchMap((authState: fromAuth.State) => {
          req = this.addToken(req, authState.userData.access_token);
          return next.handle(req);
        });
    }
    return next.handle(req);
  }

  addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: { authorization: `Bearer ${token}` }
    });
  }

  useHeader(url: string): boolean {
    if (
      url.startsWith(
        "https://untapped-pool-image-bucket.s3-accelerate.amazonaws.com"
      )
    ) {
      return false;
    }
    return true;
  }
}
