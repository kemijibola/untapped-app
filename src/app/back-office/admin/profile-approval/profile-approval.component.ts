import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromAdmin from "./../admin.reducer";
import * as PendingUserActions from "../../store/approvals/profile/profile.action";
import * as fromPendingUser from "../../store/approvals/profile/profile.reducer";
import { TalentProfile } from "src/app/interfaces";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-profile-approval",
  templateUrl: "./profile-approval.component.html",
  styleUrls: ["./profile-approval.component.css"],
})
export class ProfileApprovalComponent implements OnInit {
  approvalIsInitiated$ = this.adminStore.pipe(
    select(fromPendingUser.selectUserApprovalInitiatedStatus)
  );

  approvalInProgress$ = this.adminStore.pipe(
    select(fromPendingUser.selectUserApprovalInProgressStatus)
  );

  approvalIsCompleted$ = this.adminStore.pipe(
    select(fromPendingUser.selectUserApprovalCompletedStatus)
  );

  approvalFailed$ = this.adminStore.pipe(
    select(fromPendingUser.selectUserApprovalFailedStatus)
  );
  @ViewChild("approveUserButton", { static: false })
  approveUserButton: ElementRef;

  selectedIndex: number = -1;
  showContent: boolean = false;
  cloudFrontDomain: string = `${environment.CLOUD_FORMATION_API}/fit-in/320x240`;

  pendingUsers: TalentProfile[] = [];
  selectedUser: TalentProfile = null;
  constructor(
    private adminStore: Store<fromAdmin.AdminState>,
    private renderer: Renderer2
  ) {
    this.adminStore.dispatch(new PendingUserActions.FetchPendingUsers());
  }

  ngOnInit(): void {
    this.adminStore
      .pipe(select(fromPendingUser.selectAllPendingUser))
      .subscribe((val: TalentProfile[]) => {
        this.pendingUsers = val;
      });

    this.approvalIsCompleted$.subscribe((val: boolean) => {
      if (val) {
        this.pendingUsers = this.pendingUsers.filter(
          (x) => x.talentId != this.selectedUser.talentId
        );
        this.selectedIndex = -1;
      }
    });
  }

  onUserSelected(user: TalentProfile, index: number): void {
    if (this.showContent) {
      this.showContent = false;
    } else {
      this.showContent = true;
    }
    this.selectedUser = user;
    this.selectedIndex = index;
  }

  onApproveUser(userId: string): void {
    const approveUserBtn = this.approveUserButton.nativeElement;
    this.renderer.setProperty(approveUserBtn, "disabled", true);

    this.adminStore.dispatch(
      new PendingUserActions.ApproveUser({
        userId: this.selectedUser.talentId,
      })
    );
  }
}
