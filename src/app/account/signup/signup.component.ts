import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { emailAsyncValidator } from '../async-email.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import * as AuthActions from '../store/auth.actions';
import { Register } from 'src/app/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  time = 500;
  emailPattern = '^[a-z0-9A-Z._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
  selectedUserTypeSubscription: Subscription;
  selectedUserTypeState = '';

  constructor(private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.compose([ Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
        emailAsyncValidator(500, this.authService).bind(this)
        ),
      'password': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)])),
      'terms': new FormControl(null, Validators.required)
      });

      this.selectedUserTypeSubscription = this.store.select('userTypes').subscribe(val => {
        this.selectedUserTypeState = val['selectedUserType'];
      });
  }

  onSubmit() {
    const name: string = this.signupForm.controls['name'].value;
    const email: string = this.signupForm.controls['email'].value;
    const password: string = this.signupForm.controls['password'].value;
    const payload = {
      name: name,
      email: email,
      password: password,
      user_type: this.selectedUserTypeState,
      audience: 'http://127.0.0.1:4200'
    };
    this.store.dispatch(new AuthActions.DoSignUp(payload));
  }

  ngOnDestroy() {
    if (this.selectedUserTypeSubscription) {
        this.selectedUserTypeSubscription.unsubscribe();
    }
  }

}
