import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as RoleActions from '../../store/role.actions';
import * as fromApp from '../../../store/app.reducers';
import * as fromRole from '../../store/role.reducers';

@Component({
  selector: 'app-role-item',
  templateUrl: './role-item.component.html',
  styleUrls: ['./role-item.component.css']
})
export class RoleItemComponent implements OnInit, OnDestroy {
  rolesState: Observable<fromRole.State>;
  selectedRole = '';
  roleForm: FormGroup;
  icons = {
    Talent: 'assets/img/i2.svg',
    Professional: 'assets/img/i3.svg',
    Audience: 'assets/img/audience.svg'
  };
  ngDestroyed = new Subject();

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.rolesState = this.store.select('roles');

    this.store
      .pipe(
        select('roles'),
        takeUntil(this.ngDestroyed)
      )
      .subscribe((roleState: fromRole.State) => {
        this.selectedRole = roleState.selectedRole;
      });

    this.roleForm = new FormGroup({
      roleOfUser: new FormControl(this.selectedRole, Validators.required)
    });
  }
  onClick(id: string) {
    this.roleForm.get('roleOfUser').setValue(id);
    this.store.dispatch(new RoleActions.SetSelectedRole(id));
  }

  ngOnDestroy() {
    // set selected user type to default select
    this.store.dispatch(new RoleActions.ResetSelectedRole(this.selectedRole));
    // component clean up
    this.ngDestroyed.next();
    this.ngDestroyed.complete();
  }
}
