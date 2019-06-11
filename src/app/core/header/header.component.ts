import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../account/store/auth.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentInit {

  authState: Observable<fromAuth.State>;
  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }
  ngAfterContentInit() {
  }
}
