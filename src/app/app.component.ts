import { MediaUploadType } from "./interfaces/user/portfolio";
import { Component, HostListener, Inject, OnInit } from "@angular/core";
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from "@angular/animations";
import { DOCUMENT } from "@angular/common";
import { Store, select } from "@ngrx/store";
import * as fromApp from "./store/app.reducers";
import * as UserTypeActions from "./user-type/store/user-type.actions";
import * as CategoryTypeActions from "./shared/store/category-type/category-type.actions";
import * as CategoryActions from "./shared/store/category/category.action";
import * as UserCategoryActions from "./shared/store/filtered-categories/talent-category.action";
import * as AuthActions from "./account/store/auth.actions";
import * as fromUserType from "./user-type/store/user-type.reducers";
import {
  IAuthData,
  ReportType,
  MediaQueryParams,
  MediaType,
  UserFilterCategory,
} from "./interfaces";
import * as fromUser from "./user/user.reducers";
import * as TalentsActions from "./shared/store/talents/talents.actions";
import * as fromTalentFilter from "./shared/store/filtered-categories/talent-category.reducers";
import * as TalentCategoryActions from "./shared/store/filtered-categories/talent-category.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("fade", [
      state("void", style({ opacity: 0 })),
      transition(":enter", [animate(300)]),
      transition(":leave", [animate(500)]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = "untapped-app";
  isAuthenticated = false;
  selectedUser: UserFilterCategory;

  ngOnInit() {
    this.loadAll();
    this.store
      .pipe(select(fromTalentFilter.selectCurrentTalentWithHighestComment))
      .subscribe((val: UserFilterCategory) => {
        this.selectedUser = { ...val };
        if (this.selectedUser.user !== undefined) {
          this.fetchTalentPortfolio(this.selectedUser.user);
        }
      });
  }
  constructor(
    @Inject(DOCUMENT) document,
    private store: Store<fromApp.AppState>
  ) {}

  loadAll() {
    this.store.dispatch(new AuthActions.FetchAuthData());
    this.store.dispatch(new UserTypeActions.FetchUserTypes());
    this.store.dispatch(new CategoryTypeActions.FetchCategoryTypes());
    this.store.dispatch(new CategoryActions.FetchCategories());
    this.store.dispatch(
      new TalentCategoryActions.FetchAllTalentHighestComment(
        ReportType.highestcomment
      )
    );
  }

  fetchTalentPortfolio(userId: string) {
    const mediaQueryParams: MediaQueryParams = {
      type: MediaType.ALL,
      uploadType: MediaUploadType.ALL,
      user: userId,
    };

    this.store.dispatch(
      new TalentsActions.FetchTalentPortfolio(mediaQueryParams)
    );
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
