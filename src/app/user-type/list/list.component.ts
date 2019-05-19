import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromUserType from '../../user-type/store/user-type.reducers';
import * as fromApp from '../../store/app.reducers';
import * as UserTypeActions from '../../user-type/store/user-type.actions';

@Component({
  selector: 'app-user-type-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, AfterContentInit {

  userTypeState: Observable<fromUserType.State>;
  defaultSelect = '';
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
      this.userTypeState = this.store.select('userTypes');
  }

  ngAfterContentInit() {
    this.userTypeState.subscribe( val => {
      this.defaultSelect = val['userTypes']['data'][0]['name'] === 'Talent' ? val['userTypes']['data'][0]['_id'] : '';
    });
    this.store.dispatch(new UserTypeActions.SetSelectedUserType(this.defaultSelect));
  }

}
