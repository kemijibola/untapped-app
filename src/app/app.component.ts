import { MediaUploadType } from "./interfaces/user/portfolio";
import { Component, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Store, select } from "@ngrx/store";
import * as fromApp from "./store/app.reducers";
import * as CategoryTypeActions from "./shared/store/category-type/category-type.actions";
import * as CategoryActions from "./shared/store/category/category.action";
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
import * as ModalsActions from "./shared/store/modals/modals.actions";
import * as ToggleActions from "./shared/store/slide-toggle/slide-toggle.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
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
        modalContentCss: "",
        showMagnifier: false,
      },
      {
        index: 1,
        name: "talent-entry-details",
        display: ModalDisplay.none,
        modalCss: "",
        modalDialogCss: "",
        modalContentCss: "",
        showMagnifier: false,
      },
    ],
  };

  ngOnInit() {
    this.loadAll();
  }
  constructor(private store: Store<fromApp.AppState>) {
    // this.store.dispatch(new DashboardActions.FetchDashboardContests());

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
    this.store.dispatch(new CategoryTypeActions.FetchCategoryTypes());
    this.store.dispatch(new CategoryActions.FetchCategories());
  }
}
