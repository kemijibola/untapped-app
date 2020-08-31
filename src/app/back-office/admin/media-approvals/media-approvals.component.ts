import { FormControl, Validators } from "@angular/forms";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromAdmin from "./../admin.reducer";
import * as PendingMediaActions from "../../store/approvals/media/media.action";
import * as fromPendingMedia from "../../store/approvals/media/media.reducer";
import { IMedia } from "src/app/interfaces";
import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-media-approvals",
  templateUrl: "./media-approvals.component.html",
  styleUrls: ["./media-approvals.component.css"],
})
export class MediaApprovalsComponent implements OnInit {
  selectedMedia: IMedia = null;
  selectedItemId: string = "";
  selectedIndex: number = -1;
  showContent: boolean = false;
  rejectionForm: FormGroup;
  approvalInProgress: boolean = true;
  rejectionInProgress: boolean = false;
  cloudFrontDomain: string = `${environment.CLOUD_FORMATION_API}/fit-in/320x240`;
  audioPath: string = environment.AUDIO_ACCELERATE_URL;
  videoPath: string = environment.VIDEO_ACCELERATE_URL;

  approvalIsInitiated$ = this.adminStore.pipe(
    select(fromPendingMedia.selectApprovalInitiatedStatus)
  );

  approvalInProgress$ = this.adminStore.pipe(
    select(fromPendingMedia.selectApprovalInProgressStatus)
  );

  approvalIsCompleted$ = this.adminStore.pipe(
    select(fromPendingMedia.selectApprovalCompletedStatus)
  );

  approvalFailed$ = this.adminStore.pipe(
    select(fromPendingMedia.selectApprovalFailedStatus)
  );

  rejectionIsInitiated$ = this.adminStore.pipe(
    select(fromPendingMedia.selectRejectInitiatedStatus)
  );

  rejectionInProgress$ = this.adminStore.pipe(
    select(fromPendingMedia.selectRejectInProgressStatus)
  );

  rejectionIsCompleted$ = this.adminStore.pipe(
    select(fromPendingMedia.selectRejectCompletedStatus)
  );

  rejectionFailed$ = this.adminStore.pipe(
    select(fromPendingMedia.selectRejectFailedStatus)
  );

  pendingMedia: IMedia[] = [];

  @ViewChild("approvalButton", { static: false }) approvalButton: ElementRef;
  @ViewChild("rejectionButton", { static: false }) rejectionButton: ElementRef;
  constructor(
    private adminStore: Store<fromAdmin.AdminState>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.rejectionForm = new FormGroup({
      reason: new FormControl(null, Validators.minLength(3)),
    });

    this.adminStore
      .pipe(select(fromPendingMedia.selectAllPendingMedia))
      .subscribe((val: IMedia[]) => {
        this.pendingMedia = this.getMediaType(val);
      });

    this.approvalIsCompleted$.subscribe((val: boolean) => {
      if (val) {
        this.approvalInProgress = false;
        const modifiedMediaIndex = this.pendingMedia.indexOf(
          this.selectedMedia,
          0
        );
        this.pendingMedia[modifiedMediaIndex].items = this.pendingMedia[
          modifiedMediaIndex
        ].items.filter((x) => x._id !== this.selectedItemId);
      }
    });

    this.rejectionIsCompleted$.subscribe((val: boolean) => {
      if (val) {
        this.rejectionInProgress = false;
      }
    });

    this.rejectionFailed$.subscribe((val: boolean) => {
      if (val) {
        this.rejectionInProgress = false;
      }
    });
    this.approvalFailed$.subscribe((val: boolean) => {
      if (val) {
        this.approvalInProgress = false;
      }
    });
  }

  onMediaSelected(media: IMedia, index: number): void {
    if (this.showContent) {
      this.showContent = false;
    } else {
      this.showContent = true;
    }
    this.selectedMedia = media;
    this.selectedIndex = index;
  }

  getMediaType(medias: IMedia[]): IMedia[] {
    for (let data of medias) {
      for (let media of data.items) {
        media.type = `${data.mediaType}/${media.path.split(".").pop()}`;
      }
    }
    return medias;
  }

  onApproveMediaItem(itemId: string): void {
    this.approvalInProgress = true;
    const approvalBtn = this.approvalButton.nativeElement;
    this.renderer.setProperty(approvalBtn, "disabled", true);

    this.selectedItemId = itemId;
    this.adminStore.dispatch(
      new PendingMediaActions.ApproveMedia({
        mediaId: this.selectedMedia._id,
        mediaItemId: itemId,
      })
    );
  }

  onRejectMediaItem(itemId: string): void {
    this.rejectionInProgress = true;
    const rejectionBtn = this.rejectionButton.nativeElement;
    this.renderer.setProperty(rejectionBtn, "disabled", true);

    this.selectedItemId = itemId;
    const rejectionReason = this.rejectionForm.controls["reason"].value;

    this.adminStore.dispatch(
      new PendingMediaActions.RejectMedia({
        mediaId: this.selectedMedia._id,
        mediaItemId: itemId,
        reason: rejectionReason,
      })
    );
  }
}
