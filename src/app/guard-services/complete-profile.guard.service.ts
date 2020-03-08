import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../account/store/auth.reducers';
import { Observable } from 'rxjs';
import { selectUserData } from '../account/store/auth.selectors';
import { IAuthData, UserTypes } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable()
export class CompleteProfile implements CanActivate {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  getCurrentUserData(): Observable<any> {
    return this.store.select(selectUserData).map((val: IAuthData) => val);
  }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.getCurrentUserData().pipe(
      map((val: IAuthData) => {
        if (val.authenticated) {
          if (
            (val.user_data.userType.name === 'Talent' ||
              val.user_data.userType.name === 'Professional') &&
            !val.user_data.profile_is_completed
          ) {
            this.router.navigate(['/complete-profile']);
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      })
    );
  }
}
