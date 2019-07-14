import { mergeMap } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as RoleActions from './role.actions';
import { IRole, IResult } from 'src/app/interfaces';
import { RoleService } from '../../services/role.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class RoleEffects {
  @Effect()
  fetchRoles = this.actions$
    .pipe(ofType(RoleActions.FETCH_ROLES))
    .switchMap(() => {
      return this.roleService.getRoles();
    })
    .pipe(
      mergeMap((resp: IResult<IRole[]>) => {
        return [
          {
            type: RoleActions.SET_ROLES,
            payload: resp.data
          },
          {
            type: RoleActions.SET_SELECTEDROLE,
            payload: ''
          }
        ];
      })
    );
  constructor(private actions$: Actions, private roleService: RoleService) {}
}
