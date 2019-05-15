import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import * as fromUserType from '../../user-type/store/user-type.reducers';
import { distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import * as AuthActions from '../store/auth.actions';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  subject: Subject<any> = new Subject();
  selectedUserType = '';
  constructor(private store: Store<fromApp.AppState>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [ Validators.required, Validators.email ]),
      'password': new FormControl(null, Validators.required)
    });

      this.store.select('userTypes').subscribe(data => {
        this.selectedUserType = data.selectedUserType;
      });

    this.signupForm.controls['email'].valueChanges
    .pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe(val => {
        this.store.dispatch(new AuthActions.FetchUser(val));

        //this.signupForm.controls['email'].setValidators(this.checkEmailAvailability());
      }
    );
  }

  checkEmailAvailability() {
    //this.store.select()
  }
  onKeyUp() {
    this.subject.next();
  }
  onKeyDown() {
    // When the user starts to type, remove the validator
    this.signupForm.controls['email'].clearValidators();
  }

  onSubmit() {
    console.log(this.signupForm);
  }

}
