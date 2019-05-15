import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserTypeActions from '../../store/user-type.actions';
import * as fromApp from '../../../store/app.reducers';

@Component({
  selector: 'app-user-type-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() userType;
  userTypeForm: FormGroup;
  icons = {
    Talent: 'assets/img/i2.svg',
    Professional: 'assets/img/i3.svg',
    Audience: 'assets/img/audience.svg'
  };

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // const a = this.userType.value['name'] === 'Talent' ? this.userType.value['_id'] : '';

    this.userTypeForm = new FormGroup({
      'typeOfUser': new FormControl(null, Validators.required)
    });
  }
  onClick(id) {
    this.userTypeForm.get('typeOfUser').setValue(id);
    this.store.dispatch(new UserTypeActions.SetSelectedUserType(id));
  }

}
