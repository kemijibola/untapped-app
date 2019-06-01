import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as UserTypeActions from '../../store/user-type.actions';
import * as fromApp from '../../../store/app.reducers';
import * as fromUserType from '../../store/user-type.reducers';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-type-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {
  userTypesState: Observable<fromUserType.State>;
  selectedUserType = '';
  userTypeForm: FormGroup;
  icons = {
    Talent: 'assets/img/i2.svg',
    Professional: 'assets/img/i3.svg',
    Audience: 'assets/img/audience.svg'
  };
  ngDestroyed = new Subject();

  constructor(private store: Store<fromApp.AppState>) { }
  ngOnInit() {
    this.userTypesState = this.store.select('userTypes');

    this.store
    .pipe(
      select('userTypes'),
      takeUntil(this.ngDestroyed)
    )
    .subscribe((userTypeState: fromUserType.State) => {
      this.selectedUserType = userTypeState.selectedUserType;
    });

    this.userTypeForm = new FormGroup({
      'typeOfUser': new FormControl(this.selectedUserType, Validators.required)
    });
  }

  onClick(id: string) {
    this.userTypeForm.get('typeOfUser').setValue(id);
    this.store.dispatch(new UserTypeActions.SetSelectedUserType(id));
  }

  ngOnDestroy() {
    // component clean up
    this.store.dispatch(new UserTypeActions.RemoveSelectedUserType());
    this.ngDestroyed.next();
    this.ngDestroyed.complete();
  }

}
