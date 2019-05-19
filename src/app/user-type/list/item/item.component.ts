import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserTypeActions from '../../store/user-type.actions';
import * as fromApp from '../../../store/app.reducers';

@Component({
  selector: 'app-user-type-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {
  @Input() userType;
  @Input() defaultSelect;
  userTypeForm: FormGroup;
  icons = {
    Talent: 'assets/img/i2.svg',
    Professional: 'assets/img/i3.svg',
    Audience: 'assets/img/audience.svg'
  };

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userTypeForm = new FormGroup({
      'typeOfUser': new FormControl(this.defaultSelect, Validators.required)
    });
  }
  onClick(id: string) {
    this.userTypeForm.get('typeOfUser').setValue(id);
    this.store.dispatch(new UserTypeActions.SetSelectedUserType(id));
  }

  ngOnDestroy() {
    this.store.dispatch(new UserTypeActions.RemoveSelectedUserType());
  }

}
