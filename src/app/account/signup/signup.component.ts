import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import * as fromUserType from '../../user-type/store/user-type.reducers';
import { distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import * as AuthActions from '../store/auth.actions';
import * as fromAuth from '../store/auth.reducers';
import * as take from 'rxjs/operators/take';

import { Subject } from 'rxjs/Subject';
import { User, Result } from 'src/app/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  subject: Subject<any> = new Subject();
  selectedUserType = '';
  userExists;
  emailCheckStatus = 'VALID';
  emailIsForbidden = false;
  constructor(private store: Store<fromApp.AppState>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [ Validators.required, Validators.email], this.emailAvailability.bind(this)),
      'password': new FormControl(null, Validators.required)
      });

      this.signupForm.controls['email'].setValue('');

      this.store.select('userTypes').subscribe(data => {
        this.selectedUserType = data.selectedUserType;
      });
      this.store.pipe(select(auth => auth.auth)).subscribe(data => {
        const isEmpty = this.isEmpty(data.userByEmail.data);
        console.log('is empty', isEmpty);
        this.emailIsForbidden = isEmpty;
        // if (data.userByEmail.data[0]['email']) {
        //   resolve( {'emailIsForbidden': true });
        // } else {
        //   resolve(null);
        // }
      });
  }

  emailAvailability(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve) => {
      control.valueChanges
        .pipe(debounceTime(500)).subscribe(val => {
        if (val.length >= 2) {
          this.store.dispatch(new AuthActions.FetchUserByEmail(val));
        }
        if (this.emailIsForbidden) {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      });
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
