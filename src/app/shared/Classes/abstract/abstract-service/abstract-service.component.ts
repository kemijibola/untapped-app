import { OnInit, OnDestroy } from '@angular/core';
import { ServiceTypes } from 'src/app/lib/constants';
import { Store } from '@ngrx/store';
import * as ServiceActions from '../../../store/service/service.actions';
import * as fromApp from '../../../../store/app.reducers';

export abstract class AbstractServiceComponent implements OnInit, OnDestroy {
  abstract store: Store<fromApp.AppState>;
  abstract selectedServiceId: string;
  abstract serviceName: ServiceTypes;

  constructor() {}
  ngOnInit() {
    // trigger service fetch
    this.triggerServiceFetch();

    // set selected service Id here
    this.setCurrentService();
  }

  private setCurrentService(): void {
    // dispatch action to set selected service;
    this.store.dispatch(
      new ServiceActions.SetSelectedService(this.selectedServiceId)
    );
  }

  private triggerServiceFetch(): void {
    // fetch service by service name
    // set serviceId
    this.store.dispatch(new ServiceActions.FetchService(this.serviceName));
  }

  ngOnDestroy() {
    // reset selected service
    if (this.selectedServiceId === '') {
      this.store.dispatch(new ServiceActions.ResetSelectedService());
    }
  }
}
