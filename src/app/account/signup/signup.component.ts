import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { emailAsyncValidator } from '../async-email.validator';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import * as AuthActions from '../store/auth.actions';
import * as fromRole from '../../role/store/role.reducers';
import { takeUntil } from 'rxjs/operators';
import { IRegister } from 'src/app/interfaces';
import { AUDIENCE } from 'src/app/lib/constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterContentInit, OnDestroy {
  signupForm: FormGroup;
  time = 500;
  emailPattern = '^[a-z0-9A-Z._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
  selectedRole = '';
  ngDestroyed = new Subject();

  constructor(
    private store: Store<fromApp.AppState>,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email]),
        emailAsyncValidator(500, this.userService).bind(this)
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      terms: new FormControl(null, Validators.required)
    });
  }

  ngAfterContentInit() {
    this.store
      .pipe(
        select('roles'),
        takeUntil(this.ngDestroyed)
      )
      .subscribe((roleState: fromRole.State) => {
        this.selectedRole = roleState.selectedRole;
      });
  }
  onSubmit() {
    const username: string = this.signupForm.controls['name'].value;
    const email: string = this.signupForm.controls['email'].value;
    const password: string = this.signupForm.controls['password'].value;
    const payload: IRegister = {
      username: username,
      email: email,
      password: password,
      roles: [this.selectedRole],
      audience: AUDIENCE
    };
    this.store.dispatch(new AuthActions.DoSignUp(payload));
  }

  ngOnDestroy() {
    this.ngDestroyed.next();
    this.ngDestroyed.complete();
  }
}
