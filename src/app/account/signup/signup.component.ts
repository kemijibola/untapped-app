import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import * as fromUserType from '../../user-type/store/user-type.reducers';
import { distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import * as AuthActions from '../store/auth.actions';
import * as fromAuth from '../store/auth.reducers';

import { Subject } from 'rxjs/Subject';
import { User } from 'src/app/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  subject: Subject<any> = new Subject();
  selectedUserType = '';
  userExists: User;
  constructor(private store: Store<fromApp.AppState>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [ Validators.required, Validators.email], 
            this.emailAvailability.bind(this)),
      'password': new FormControl(null, Validators.required)
    });

      this.store.select('userTypes').subscribe(data => {
        this.selectedUserType = data.selectedUserType;
      });
  }

  emailAvailability(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
        control.valueChanges
          .pipe(debounceTime(500), distinctUntilChanged())
          .subscribe(val => {
            if (val.length > 1) {
              this.store.dispatch(new AuthActions.DoEmailCheck(val));
              this.store.select('auth').subscribe(data => {
                if (data.isEmailAvailable) {
                  resolve({'emailIsForbidden': true});
                } else {
                    resolve(null);
                }
              });
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
  // checkEmailAvailability(): boolean {
  //  // let isValid = false;
  //   this.store.select('auth').subscribe(data => {
  //     console.log(data);
  //     this.userExists = data.user;
  //   });
  //   return this.userExists ? true : false;
  // }
  onKeyUp() {
    this.subject.next();
  }
  onKeyDown() {
    // When the user starts to type, remove the validator
    //this.signupForm.controls['email'].clearValidators();
  }

  onSubmit() {
    console.log(this.signupForm);
  }

}
