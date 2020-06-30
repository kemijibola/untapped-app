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
import * as ServiceActions from "./shared/store/service/service.actions";
import * as AuthActions from "./account/store/auth.actions";
import * as fromUserType from "./user-type/store/user-type.reducers";
import {
  IAuthData,
  ReportType,
  MediaQueryParams,
  MediaType,
  UserFilterCategory,
  ModalDisplay,
  AppModal,
  IToggle,
} from "./interfaces";
import * as TalentsActions from "./shared/store/talents/talents.actions";
import * as fromTalentFilter from "./shared/store/filtered-categories/talent-category.reducers";
import * as TalentCategoryActions from "./shared/store/filtered-categories/talent-category.action";
import * as ContestsAction from "./contests/store/contests.action";
import * as ModalsActions from "./shared/store/modals/modals.actions";
import * as ProfessionalCategoryActions from "./shared/store/filtered-categories/professional-category/professional-category.actions";
import * as ToggleActions from "./shared/store/slide-toggle/slide-toggle.actions";
import * as DashboardActions from "./shared/store/dashboard/dashboard.action";
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
  componentToggle: IToggle[] = [
    {
      name: "modal-upload-toggle",
      title: "Multiple Upload",
      state: false,
    },
    {
      name: "settings-tap-notification",
      title: "",
      state: false,
    },
    {
      name: "settings-email-notification",
      title: "",
      state: false,
    },
    {
      name: "settings-profile-visibility",
      title: "",
      state: false,
    },
  ];

  componentModal: AppModal = {
    id: "contest",
    modals: [
      {
        index: 0,
        name: "new-entry",
        display: ModalDisplay.none,
        modalCss: "",
        modalDialogCss: "",
        showMagnifier: false,
      },
      {
        index: 1,
        name: "talent-entry-details",
        display: ModalDisplay.none,
        modalCss: "",
        modalDialogCss: "",
        showMagnifier: false,
      },
    ],
  };

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
  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new DashboardActions.FetchDashboardContests());

    this.store.dispatch(
      new ModalsActions.AddComponentModal({
        componentModal: this.componentModal,
      })
    );

    // setup all component slide-toggles here
    this.store.dispatch(
      new ToggleActions.AddComponentToggle({
        componentToggle: this.componentToggle,
      })
    );
  }

  loadAll() {
    this.store.dispatch(new AuthActions.FetchAuthData());
    this.store.dispatch(new UserTypeActions.FetchUserTypes());
    this.store.dispatch(new CategoryTypeActions.FetchCategoryTypes());
    this.store.dispatch(new CategoryActions.FetchCategories());
    this.store.dispatch(
      new TalentCategoryActions.FetchAllTalentHighestComment({
        queryParams: {
          type: ReportType.highestcomment,
        },
      })
    );
    this.store.dispatch(
      new ProfessionalCategoryActions.FetchAllProfessional({
        queryParams: {
          type: ReportType.allprofessionals,
        },
      })
    );
    this.store.dispatch(new ServiceActions.FetchServices());
  }

  fetchTalentPortfolio(userId: string) {
    const mediaQueryParams: MediaQueryParams = {
      type: MediaType.ALL,
      uploadType: MediaUploadType.all,
      user: userId,
    };

    this.store.dispatch(
      new TalentsActions.FetchTalentPortfolio(mediaQueryParams)
    );
  }

  // @HostListener("window:scroll", ["$event"])
  // onWindowScroll() {
  //   if (window.pageYOffset > 0) {
  //     const element = document.getElementById("top-header");
  //     element.classList.add("sticky");
  //   } else {
  //     const element = document.getElementById("top-header");
  //     element.classList.remove("sticky");
  //   }
  // }
}
