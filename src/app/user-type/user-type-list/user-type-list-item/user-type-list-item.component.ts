import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as UserTypeActions from '../../store/user-type.actions';
import * as fromApp from '../../../store/app.reducers';
import * as fromUserType from '../../store/user-type.reducers';

@Component({
  selector: 'app-user-type-list-item',
  templateUrl: './user-type-list-item.component.html',
  styleUrls: ['./user-type-list-item.component.css']
})
export class UserTypeListItemComponent implements OnInit, OnDestroy {
  userTypeState: Observable<fromUserType.State>;
  ngDestroyed = new Subject();
  selectedUserType = '';
  userTypeForm: FormGroup;
  icons = {
    Talent: 'assets/img/i2.svg',
    Professional: 'assets/img/i3.svg',
    Audience: 'assets/img/audience.svg'
  };
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userTypeState = this.store.select('userTypes');

    this.store
      .pipe(
        select('userTypes'),
        takeUntil(this.ngDestroyed)
      )
      .subscribe((userTypeState: fromUserType.State) => {

        this.selectedUserType = userTypeState.selectedUserType;
      });

    this.userTypeForm = new FormGroup({
      typeOfUser: new FormControl(this.selectedUserType, Validators.required)
    });
  }

  onClick(id: string) {
    this.userTypeForm.get('typeOfUser').setValue(id);
    this.store.dispatch(new UserTypeActions.SetSelectedUserType(id));
  }

  ngOnDestroy() {
    // set selected user type to default select
    this.store.dispatch(
      new UserTypeActions.ResetSelectedUserType(this.selectedUserType)
    );
    // component clean up
    this.ngDestroyed.next();
    this.ngDestroyed.complete();
  }
}
