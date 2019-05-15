import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromUserType from '../../user-type/store/user-type.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-user-type-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  userTypeState: Observable<fromUserType.State>;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userTypeState = this.store.select('userTypes');
  }

}
