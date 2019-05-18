import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { timer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators/';
import { map } from 'rxjs/operators/';

export function emailAsyncValidator(time: number = 500, authService: AuthService) {
  return (input: FormControl): Observable<any> | Promise<any> => {
    return timer(500)
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

