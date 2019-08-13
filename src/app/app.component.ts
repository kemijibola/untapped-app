import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import * as RoleActions from './role/store/role.actions';
import * as fromRole from './role/store/role.reducers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(300)]),
      transition(':leave', [animate(500)])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'untapped-app';
  ngOnInit() {
    this.onFetchUserTypes();
  }
  constructor(
    @Inject(DOCUMENT) document,
    private store: Store<fromRole.State>
  ) {}

  onFetchUserTypes() {
    this.store.dispatch(new RoleActions.FetchRoles());
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll() {
  //   if (window.pageYOffset > 0) {
  //     const element = document.getElementById('top-header');
  //     element.classList.add('sticky');
  //   } else {
  //     const element = document.getElementById('top-header');
  //     element.classList.remove('sticky');
  //   }
  // }
}
