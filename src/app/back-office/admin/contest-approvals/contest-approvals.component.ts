import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { IContest } from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import * as fromAdmin from "./../admin.reducer";
import * as fromPendingContest from "../../store/approvals/contest/contest.reducer";
import * as PendingContestActions from "../../store/approvals/contest/contest.action";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-contest-approvals",
  templateUrl: "./contest-approvals.component.html",
  styleUrls: ["./contest-approvals.component.css"],
})
export class ContestApprovalsComponent implements OnInit {
  selectedIndex: number = -1;
  selectedContest: IContest = null;
  showContent: boolean = false;
  pendingContests: IContest[] = [];
  cloudFrontDomain: string = `${environment.CLOUD_FORMATION_API}/fit-in/320x240`;
  contestRejectionForm: FormGroup;
  @ViewChild("contestApprovalButton", { static: false })
  contestApprovalButton: ElementRef;
  @ViewChild("contestRejectionButton", { static: false })
  contestRejectionButton: ElementRef;
  constructor(
    private adminStore: Store<fromAdmin.AdminState>,
    private renderer: Renderer2
  ) {}
  approvalIsInitiated$ = this.adminStore.pipe(
    select(fromPendingContest.selectApprovalInitiatedStatus)
  );

  approvalInProgress$ = this.adminStore.pipe(
    select(fromPendingContest.selectApprovalInProgressStatus)
  );

  approvalIsCompleted$ = this.adminStore.pipe(
    select(fromPendingContest.selectApprovalCompletedStatus)
  );

  approvalFailed$ = this.adminStore.pipe(
    select(fromPendingContest.selectApprovalFailedStatus)
  );

  rejectionIsInitiated$ = this.adminStore.pipe(
    select(fromPendingContest.selectRejectInitiatedStatus)
  );

  rejectionInProgress$ = this.adminStore.pipe(
    select(fromPendingContest.selectRejectInProgressStatus)
  );

  rejectionIsCompleted$ = this.adminStore.pipe(
    select(fromPendingContest.selectRejectCompletedStatus)
  );

  rejectionFailed$ = this.adminStore.pipe(
    select(fromPendingContest.selectRejectFailedStatus)
  );

  ngOnInit(): void {
    this.contestRejectionForm = new FormGroup({
      reason: new FormControl(null, Validators.minLength(3)),
    });
    this.adminStore
      .pipe(select(fromPendingContest.selectAllPendingContest))
      .subscribe((val: IContest[]) => {
        this.pendingContests = val;
      });

    this.approvalIsCompleted$.subscribe((val: boolean) => {
      if (val) {
        this.pendingContests = this.pendingContests.filter(
          (x) => x._id != this.selectedContest._id
        );
        this.selectedIndex = -1;
      }
    });
  }

  onContestSelected(contest: IContest, index: number): void {
    if (this.showContent) {
      this.showContent = false;
    } else {
      this.showContent = true;
    }
    this.selectedContest = contest;
    this.selectedIndex = index;
  }

  onApproveContest(contestId: string): void {
    const contestApprovalBtn = this.contestApprovalButton.nativeElement;
    this.renderer.setProperty(contestApprovalBtn, "disabled", true);

    this.adminStore.dispatch(
      new PendingContestActions.ApproveContest({ contestId })
    );
  }

  onRejectContest(contestId: string): void {
    const contestRejectionBtn = this.contestRejectionButton.nativeElement;
    this.renderer.setProperty(contestRejectionBtn, "disabled", true);

    const rejectionReason = this.contestRejectionForm.controls["reason"].value;

    this.adminStore.dispatch(
      new PendingContestActions.RejectContest({
        contestId: this.selectedContest._id,
        reason: rejectionReason,
      })
    );

    this.contestRejectionForm.controls["reason"].setValue("");
  }
}
