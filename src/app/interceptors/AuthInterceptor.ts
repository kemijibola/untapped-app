import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../account/store/auth.reducers";
import { IAuthData } from "../interfaces";
import { catchError, take, concatMap } from "rxjs/operators";
import { environment } from "../../../src/environments/environment.dev";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string;
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.useHeader(req.url)) {
      return this.store.select(fromAuth.selectCurrentUserData).pipe(
        take(1),
        concatMap((autData: IAuthData) => {
          req = this.addToken(req, autData.access_token);
          return next.handle(req);
        })
      );
    }
    return next.handle(req);
  }

  addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        clientId: environment.clientId,
      },
    });
  }

  useHeader(url: string): boolean {
    if (url.startsWith(environment.S3BUCKET_OBJECT_URL)) {
      return false;
    } else if (url.startsWith(environment.AUDIO_ACCELERATE_URL)) {
      return false;
    } else if (url.startsWith(environment.VIDEO_ACCELERATE_URL)) {
      return false;
    }
    return true;
  }
}
