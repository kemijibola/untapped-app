import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILogin } from 'src/app/interfaces';
import { selectErrorMessage } from '../store/auth.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage = '';
  hasError = false;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      )
    });

    this.store.pipe(select(selectErrorMessage)).subscribe((val: string) => {
      if (val) {
        this.hasError = true;
        this.errorMessage = val;
      }
    });
  }

  onSignin() {
    this.hasError = false;
    this.store.dispatch(new AuthActions.ResetFailureMessage());
    const email: string = this.signinForm.controls['email'].value;
    const password: string = this.signinForm.controls['password'].value;
    const payload: ILogin = {
      email,
      password,
      audience: 'untappedpool.com'
    };
    this.store.dispatch(new AuthActions.DoSignIn({ loginParam: payload }));
  }
}
