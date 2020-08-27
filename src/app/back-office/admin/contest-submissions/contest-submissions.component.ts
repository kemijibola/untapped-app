import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import {
  IContestEntry,
  IContestEntryDetails,
} from "src/app/interfaces/contests/Contest";
import { Store, select } from "@ngrx/store";
import * as fromAdmin from "./../admin.reducer";
import * as fromPendingEntry from "../../store/approvals/entry/entry.reducer";
import * as PendingEntryActions from "../../store/approvals/entry/entry.action";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-contest-submissions",
  templateUrl: "./contest-submissions.component.html",
  styleUrls: ["./contest-submissions.component.css"],
})
export class ContestSubmissionsComponent implements OnInit {
  selectedIndex: number = -1;
  selectedEntry: IContestEntryDetails = null;
  showContent: boolean = false;
  pendingEntries: IContestEntryDetails[] = [];
  entryRejectionForm: FormGroup;
  cloudFrontDomain: string = `${environment}/fit-in/320x240`;
  @ViewChild("contestApprovalButton", { static: false })
  contestApprovalButton: ElementRef;
  @ViewChild("contestRejectionButton", { static: false })
  contestRejectionButton: ElementRef;
  approvalIsInitiated$ = this.adminStore.pipe(
    select(fromPendingEntry.selectApprovalInitiatedStatus)
  );

  approvalInProgress$ = this.adminStore.pipe(
    select(fromPendingEntry.selectApprovalInProgressStatus)
  );

  approvalIsCompleted$ = this.adminStore.pipe(
    select(fromPendingEntry.selectApprovalCompletedStatus)
  );

  approvalFailed$ = this.adminStore.pipe(
    select(fromPendingEntry.selectApprovalFailedStatus)
  );

  rejectionIsInitiated$ = this.adminStore.pipe(
    select(fromPendingEntry.selectRejectInitiatedStatus)
  );

  rejectionInProgress$ = this.adminStore.pipe(
    select(fromPendingEntry.selectRejectInProgressStatus)
  );

  rejectionIsCompleted$ = this.adminStore.pipe(
    select(fromPendingEntry.selectRejectCompletedStatus)
  );

  rejectionFailed$ = this.adminStore.pipe(
    select(fromPendingEntry.selectRejectFailedStatus)
  );

  @ViewChild("entryApprovalButton", { static: false })
  entryApprovalButton: ElementRef;
  @ViewChild("entryRejectionButton", { static: false })
  entryRejectionButton: ElementRef;
  constructor(
    private adminStore: Store<fromAdmin.AdminState>,
    private renderer: Renderer2
  ) {
    this.adminStore.dispatch(new PendingEntryActions.FetchPendingEntries());
  }

  ngOnInit(): void {
    this.entryRejectionForm = new FormGroup({
      reason: new FormControl(null, Validators.minLength(3)),
    });

    this.adminStore
      .pipe(select(fromPendingEntry.selectAllPendingEntry))
      .subscribe((val: IContestEntryDetails[]) => {
        this.pendingEntries = this.getMediaType(val);
      });

    this.approvalIsCompleted$.subscribe((val: boolean) => {
      if (val) {
        this.pendingEntries = this.pendingEntries.filter(
          (x) => x._id != this.selectedEntry._id
        );
        this.selectedIndex = -1;
      }
    });
  }

  onEntrySelected(entry: IContestEntryDetails, index: number): void {
    if (this.showContent) {
      this.showContent = false;
    } else {
      this.showContent = true;
    }
    this.selectedEntry = entry;
    this.selectedIndex = index;
  }

  getMediaType(entries: IContestEntryDetails[]): IContestEntryDetails[] {
    for (let media of entries) {
      media.type = `${media.contest.entryMediaType.toLowerCase()}/${media.entry
        .split(".")
        .pop()}`;
      media.contest.entryMediaType = media.contest.entryMediaType.toLowerCase();
    }
    console.log("entie", entries);
    return entries;
  }

  onRejectEntry(entryId: string): void {
    const entryRejectionBtn = this.entryRejectionButton.nativeElement;
    this.renderer.setProperty(entryRejectionBtn, "disabled", true);

    const rejectionReason = this.entryRejectionForm.controls["reason"].value;

    this.adminStore.dispatch(
      new PendingEntryActions.RejectEntry({
        entryId: entryId,
        reason: rejectionReason,
      })
    );
    this.entryRejectionForm.controls["reason"].setValue("");
  }

  onApproveEntry(entryId: string): void {
    const entryApprovalBtn = this.entryApprovalButton.nativeElement;
    this.renderer.setProperty(entryApprovalBtn, "disabled", true);

    this.adminStore.dispatch(
      new PendingEntryActions.ApproveEntry({
        entryId: entryId,
      })
    );
  }
}
