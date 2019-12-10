import { Component, HostListener, Inject, OnInit } from "@angular/core";
import {
  trigger,
  state,
  transition,
  style,
  animate
} from "@angular/animations";
import { DOCUMENT } from "@angular/common";
import { Store, select } from "@ngrx/store";
import * as fromApp from "./store/app.reducers";
import * as UserTypeActions from "./user-type/store/user-type.actions";
import * as CategoryTypeActions from "./shared/store/category-type/category-type.actions";
import * as AuthActions from "./account/store/auth.actions";
import { selectUserData } from "./account/store/auth.selectors";
import * as fromUserType from "./user-type/store/user-type.reducers";
import { IAuthData } from "./interfaces";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("fade", [
      state("void", style({ opacity: 0 })),
      transition(":enter", [animate(300)]),
      transition(":leave", [animate(500)])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = "untapped-app";
  isAuthenticated = false;
  ngOnInit() {
    this.onFetchUserTypes();
    this.store.dispatch(new CategoryTypeActions.FetchCategories());
  }
  constructor(
    @Inject(DOCUMENT) document,
    private store: Store<fromApp.AppState>
  ) {}

  onFetchUserTypes() {
    this.store.dispatch(new UserTypeActions.FetchUserTypes());
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
