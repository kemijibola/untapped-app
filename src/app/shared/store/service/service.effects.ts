import { map } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import * as ServiceActions from './service.actions';
import { IResult, IService } from 'src/app/interfaces';

@Injectable()
export class ServiceEffects {
  @Effect()
  fetchServices = this.actions$
    .pipe(ofType(ServiceActions.FETCH_SERVICE))
    .switchMap((action: ServiceActions.FetchService) => {
      return this.servicesService.getServices(action.payload);
    })
    .pipe(
      map((resp: IResult<IService>) => {
        return {
          type: ServiceActions.SET_SERVICE,
          payload: resp.data
        };
      })
    );

  constructor(
    private actions$: Actions,
    private servicesService: ServicesService
  ) {}
}
