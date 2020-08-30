import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import "rxjs/add/operator/take";
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../account/store/auth.reducers";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { IAuthData } from "../interfaces";
import { map, tap, concatMap } from "rxjs/operators";
import * as AuthActions from "../account/store/auth.actions";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService
  ) {}

  getUserDataFromStore(): Observable<any> {
    return this.store.select(fromAuth.selectCurrentUserData).pipe(
      map((val: IAuthData) => (val ? val : new AuthActions.FetchAuthData())),
      map((data: IAuthData) => data)
    );
  }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.getUserDataFromStore().pipe(
      map((val: IAuthData) => {
        if (!val.authenticated) {
          
          this.store.dispatch(new AuthActions.DeleteAutData());
          this.authService.removeItem("authData").subscribe((val: boolean) => {
            if (val) {
              return this.router.navigate(["/account/login"], {
                queryParams: {
                  returnUrl: state.url,
                },
              });
            }
          });
        }
        return true;
      })
    );
  }
}
