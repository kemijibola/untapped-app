import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ChangeDetectionStrategy
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
} from "../interfaces";
import { Router } from "@angular/router";
import * as ModalsActions from "../shared/store/modals/modals.actions";
import * as fromModal from "../shared/store/modals/modals.reducers";
import * as _ from "underscore";
import * as fromTalentWithHighestComment from "../shared/store/filtered-categories/talent-category.reducers";
import { Observable } from "rxjs";
import * as UserFilterActions from "../shared/store/filtered-categories/user-filter/user-filter.action";
import * as fromUserFilter from "../shared/store/filtered-categories/user-filter/user-filter.reducer";

import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
} from "ngx-perfect-scrollbar";

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
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
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
  ngOnInit() {
    this.fetchUsers();

    // this.completed$.subscribe((val) => {

    // });

    this.currentUser = this.store.pipe(select(fromAuth.selectCurrentUserData));

    this.store.dispatch(
      new ModalsActions.AddComponentModal({
        componentModal: this.componentModal,
      })
    );

    // this.talents = this.store.pipe(select(fromUserFilter.selectAllUsers));
  }

  ngAfterViewInit() {
    // this.scrollContainer = this.talentFrame.nativeElement;
    // this.scrollToXY(25, 50);
  }

  public scrollToXY(x: number, y: number): void {
    // this.scrollContainer.scrollTo(x, y, 500);
    // this.scrollContainer.scrollLeft(80);
    // console.log(this.scrollContainer);
    // if (this.type === "directive" && this.directiveRef) {
    //   this.directiveRef.scrollTo(x, y, 500);
    // } else if (
    //   this.type === "component" &&
    //   this.componentRef &&
    //   this.componentRef.directiveRef
    // ) {
    //   console.log("here");
    //   this.componentRef.directiveRef.scrollTo(x, y, 500);
    // }
  }

  onSignUpClicked() {
    this.router.navigate(["/account/signin"]);
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
