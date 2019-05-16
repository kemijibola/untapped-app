import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import * as fromUserType from '../../user-type/store/user-type.reducers';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import * as AuthActions from '../store/auth.actions';
import * as fromAuth from '../store/auth.reducers';
import * as take from 'rxjs/operators/take';

import { Subject } from 'rxjs/Subject';
import { User, Result } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { resolve } from 'url';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  subject: Subject<any> = new Subject();
  selectedUserType = '';
  userExists = {};
  emailCheckStatus = 'VALID';
  emailIsForbidden;
  constructor(private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [ Validators.required, Validators.email], this.emailAvailability.bind(this)),
      'password': new FormControl(null, Validators.required)
      });

      this.store.select('userTypes').subscribe(data => {
        this.selectedUserType = data.selectedUserType;
      });
      this.store.select('auth').subscribe(data => {
        this.emailIsForbidden = data.emailIsAvailable;
      });
  }

  emailAvailability(control: FormControl): Promise<any> | Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve) => {
        control.valueChanges
          .pipe(debounceTime(1000), distinctUntilChanged())
          .subscribe(val => {
            if (val.length >= 2) {
              this.store.dispatch(new AuthActions.FetchUserByEmail(val));
            }
          });
        if (this.emailIsForbidden) {
          resolve({'emailForbidden': true});
        } else {
          resolve(null);
        }
    });
    return promise;
  }

  isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
    }
    return true;
  }
  onKeyDown() {
    // When the user starts to type, remove the validator
    //this.signupForm.controls['email'].clearValidators();
  }

  onSubmit() {
    console.log(this.signupForm);
  }

}
