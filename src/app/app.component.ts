import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import * as UserTypeActions from './user-type/store/user-type.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade',
    [
      state('void', style({ opacity : 0})),
      transition(':enter', [ animate(300)]),
      transition(':leave', [ animate(500)]),
    ]
  )]
})
export class AppComponent implements OnInit {
  title = 'untapped-app';
  ngOnInit() {
    this.onFetchUserTypes();
  }
  constructor(@Inject(DOCUMENT) document, private store: Store<fromApp.AppState>) {}

  onFetchUserTypes() {
    this.store.dispatch(new UserTypeActions.FetchUserTypes());
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 0) {
       const element = document.getElementById('navbar');
       element.classList.add('sticky');
     } else {
      const element = document.getElementById('navbar');
        element.classList.remove('sticky');
     }
  }
}
