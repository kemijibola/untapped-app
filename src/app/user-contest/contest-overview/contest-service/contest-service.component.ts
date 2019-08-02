import { Component, OnInit } from '@angular/core';
import { ServiceTypes } from 'src/app/lib/constants';
import { AbstractServiceComponent } from 'src/app/shared/Classes/abstract/abstract-service/abstract-service.component';
import * as fromApp from '../../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { selectService } from '../../../shared/store/service/service.selectors';
import { map } from 'rxjs/operators';
import { IService } from 'src/app/interfaces';

@Component({
  selector: 'app-contest-service',
  templateUrl: './contest-service.component.html',
  styleUrls: ['./contest-service.component.css']
})
export class ContestServiceComponent extends AbstractServiceComponent {
  serviceName = ServiceTypes.Contest;
  selectedServiceId = '';

  constructor(public store: Store<fromApp.AppState>) {
    super();
    this.store.pipe(
      select(selectService),
      map((resp: IService) => {
        this.selectedServiceId = resp._id;
      })
    );
  }
}
