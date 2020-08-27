import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import {
  IAuthData,
  IModal,
  ModalDisplay,
  AppModal,
  UserFilterCategory,
  ReportType,
  IUserType,
} from "../interfaces";
import { Router } from "@angular/router";
import * as ModalsActions from "../shared/store/modals/modals.actions";
import * as fromModal from "../shared/store/modals/modals.reducers";
import * as _ from "underscore";
import * as fromTalentWithHighestComment from "../shared/store/filtered-categories/talent-category.reducers";
import { Observable } from "rxjs";
import * as UserFilterActions from "../shared/store/filtered-categories/user-filter/user-filter.action";
import * as fromUserFilter from "../shared/store/filtered-categories/user-filter/user-filter.reducer";
import * as fromUserTypeReducer from "../user-type/store/user-type.reducers";
import * as UserTypeActions from "../user-type/store/user-type.actions";

import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
} from "ngx-perfect-scrollbar";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-talents",
  templateUrl: "./talents.component.html",
  styleUrls: ["./talents.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TalentsComponent implements OnInit, AfterViewInit, OnDestroy {
  width: number = window.innerWidth;
  public type: string = "component";
  currentUser: Observable<IAuthData>;
  searchPlaceHolderText = "Talents";
  talents: Observable<UserFilterCategory[]>;

  initiated$ = this.store.pipe(
    select(fromUserFilter.selectUsersInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromUserFilter.selectUsersInProgressStatus)
  );

  completed$ = this.store.pipe(
    select(fromUserFilter.selectUsersCompletedStatus)
  );

  failed$ = this.store.pipe(select(fromUserFilter.selectUsersFailedStatus));

  @ViewChild("talentFrame", { static: false }) talentFrame: ElementRef;
  private scrollContainer: any;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private store: Store<fromApp.AppState>, private router: Router) {
    this.store.dispatch(new UserTypeActions.FetchUserTypes());
  }
  componentModal: AppModal = {
    id: "talent-portfolio",
    modals: [
      {
        index: 0,
        name: "album-modal",
        display: ModalDisplay.none,
        modalCss: "",
        modalDialogCss: "",
        modalContentCss: "",
        showMagnifier: false,
      },
    ],
  };
  talentUserTypeId: string = environment.TALENT_USER_TYPE_ID;
  ngOnInit() {
    this.fetchUsers();

    this.currentUser = this.store.pipe(select(fromAuth.selectCurrentUserData));

    this.store.dispatch(
      new ModalsActions.AddComponentModal({
        componentModal: this.componentModal,
      })
    );

    // this.store
    //   .select(fromUserTypeReducer.selectAllUserTypes)
    //   .subscribe((val: IUserType[]) => {
    //     this.talentUserTypeId = val.filter((x) => x.name === "Talent")[0]._id;
    //   });
  }

  ngAfterViewInit() {
    // this.scrollContainer = this.talentFrame.nativeElement;
    // this.scrollToXY(25, 50);
  }

  onSignUpClicked() {
    this.router.navigate(["/account/signup"]);
  }

  fetchUsers(): void {
    this.store.dispatch(
      new UserFilterActions.FetchAllUsers({
        queryParams: {
          type: ReportType.highestcomment,
        },
      })
    );
  }

  ngOnDestroy() {
    // if (_.has(this.componentModal, "id")) {
    //   const modalToClose: IModal = {
    //     index: 0,
    //     name: "album-modal",
    //     display: ModalDisplay.none,
    //     modalCss: "",
    //     modalDialogCss: "",
    //     showMagnifier: false,
    //   };
    //   this.store.dispatch(
    //     new ModalsActions.ToggleModal({
    //       appModal: this.componentModal,
    //       modal: modalToClose,
    //     })
    //   );
    // }
  }
}
