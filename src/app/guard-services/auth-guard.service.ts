import { selectUserData } from './../account/store/auth.selectors';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import 'rxjs/add/operator/take';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../account/store/auth.reducers';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthData } from '../interfaces';
import { map, tap } from 'rxjs/operators';

import * as AuthActions from '../account/store/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  getUserDataFromStore(): Observable<any> {
    return this.store
      .select(selectUserData)
      .do((val: IAuthData) => {
        if (!val) {
          this.store.dispatch(new AuthActions.FetchAuthData());
        }
      })
      .map((val: IAuthData) => val);
  }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.getUserDataFromStore().pipe(
      map((val: IAuthData) => {
        if (val.authenticated) {
          return true;
        } else {
          this.router.navigate(['/account/login'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
      })
    );
  }

  // canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   return this.store.select('auth').map((authState: fromAuth.State) => {
  //     if (authState.userData.authenticated) {
  //       return true;
  //     } else {
  //       this.router.navigate(['/account/login'], {
  //         queryParams: {
  //           return: state.url
  //         }
  //       });
  //       return false;
  //     }
  //   });
  // }
}
