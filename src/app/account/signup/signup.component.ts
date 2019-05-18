import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, switchMap, switchMapTo, filter,
  tap, map, take, withLatestFrom, takeLast, last, mergeMap } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import * as AuthActions from '../store/auth.actions';
import { timer, of, pipe } from 'rxjs';
import { emailAsyncValidator } from '../async-email.validator';
import { AuthService } from 'src/app/services/auth.service';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  selectedUserType = '';
  userExists = {};
  emailCheckStatus = 'VALID';
  emailIsForbidden;
  time = 500;
  emailPattern = '^[a-z0-9A-Z._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
  constructor(private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.compose([ Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
        emailAsyncValidator(500, this.authService).bind(this)
        ),
      'password': new FormControl(null, Validators.required)
      });

      this.store.select('userTypes').subscribe(data => {
        this.selectedUserType = data.selectedUserType;
      });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

}
