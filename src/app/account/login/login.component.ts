import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILogin } from 'src/app/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  onSignin() {
      const email: string = this.signinForm.controls['email'].value;
      const password: string = this.signinForm.controls['password'].value;
      const payload: ILogin = {
        email,
        password,
        audience: 'untappedpool.com'
      };
      this.store.dispatch(new AuthActions.DoSignIn(payload));
  }

}
