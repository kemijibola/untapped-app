import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../account/store/auth.actions';
import { selectUserData } from '../../account/store/auth.selectors';
import { IAuthData } from 'src/app/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentInit {
  isAuthenticated: boolean;
  userPreEmailAdress = '';
  constructor(private store: Store<fromApp.AppState>) {}

  // TODO:: properties needed, fullname, Split and use [0] for display name
  // email address also needed for username

  ngOnInit() {
    this.store.dispatch(new AuthActions.FetchAuthData());
    this.store.pipe(select(selectUserData)).subscribe((val: IAuthData) => {
      this.isAuthenticated = val.authenticated;
      this.userPreEmailAdress = val.email.split('@')[0];
    });
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.LogOut());
  }

  ngAfterContentInit() {}
}
