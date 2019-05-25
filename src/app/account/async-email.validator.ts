import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { timer, of, pipe, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators/';
import { map } from 'rxjs/operators/';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

export function emailAsyncValidator(time: number = 500, authService: AuthService) {
  return (input: FormControl): Observable<any> | Promise<any> => {
    return timer(time)
        .pipe(
          switchMap(() =>
              authService.findUserByEmail(input.value)
          ),
          map(res => {
            return res['data'][0] === undefined ? null : { emailExist: true};
          })
        );
  };
}

