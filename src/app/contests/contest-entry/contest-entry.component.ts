import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  IFileInputModel,
  MediaAcceptType,
  IFileModel,
  IFileMetaData,
  CloudUploadParams,
  SignedUrl,
  IPresignRequest,
  UPLOADCOMPONENT,
  UPLOADACTION,
} from "./../../interfaces/shared/file";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import {
  ContestData,
  UploadedItems,
  IContestEntry,
  IMediaItem,
  MediaType,
  AppNotificationKey,
  MediaUploadType,
  AppModal,
  ModalDisplay,
  ModalViewModel,
  IModal,
} from "src/app/interfaces";
import * as fromApp from "../../store/app.reducers";
import * as fromContest from "../store/contests.reducers";
import { Store, select } from "@ngrx/store";
import * as fromUpload from "src/app/shared/store/upload/upload.reducers";
import * as ContestEntryActions from "../store/contest-entry/contest-entry.action";
import * as fromContestEntry from "../store/contest-entry/contest-entry.reducer";
import * as UploadActions from "../../shared/store/upload/upload.actions";
import { AcceptedMedias } from "src/app/interfaces/media/image";
import * as NotificationActions from "../../store/global/notification/notification.action";
import * as fromModal from "../../shared/store/modals/modals.reducers";
import * as _ from "underscore";
import * as ModalsActions from "../../shared/store/modals/modals.actions";
@Component({
  selector: "app-contest-entry",
  templateUrl: "./contest-entry.component.html",
  styleUrls: ["./contest-entry.component.css"],
})
export class ContestEntryComponent implements OnInit {
  fileConfig: IFileInputModel;
  private filesToUpload: File[];
  private file: IPresignRequest;
  uploadComponent = UPLOADCOMPONENT.contestentry;
  uploadAction = UPLOADACTION.updateimagealbum;
  contestEntryForm: FormGroup;
  @Input() selectedContest: ContestData;
  uploadedItems: UploadedItems;
  cloudItems: UploadedItems;
  showUploading: boolean = false;
  showCompleted: boolean = false;
  showDiv: boolean = false;
  canUpload: boolean = true;
  fileName: string = "";

  isInitiated$ = this.store.pipe(
    select(fromContestEntry.selectEntrytrInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromContestEntry.selectEntryInProgressStatus)
  );

  isCompleted$ = this.store.pipe(
    select(fromContestEntry.selectEntryCompletedStatus)
  );

  failed$ = this.store.pipe(select(fromContestEntry.selectEntryFailedStatus));
  componentModal: AppModal;
  @ViewChild("enterContestButton", { static: false })
  enterContestButton: ElementRef;
  constructor(
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.isCompleted$.subscribe((val: boolean) => {
      if (val) {
        this.closeModalDialog("new-entry");
      }
    });
    this.store
      .pipe(select(fromUpload.selectCurrentUploadedItem))
      .subscribe((val: UploadedItems) => {
        this.cloudItems = val;
      });

    this.store
      .pipe(select(fromUpload.selectCurrentUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.showUploading = true;
          this.canUpload = false;
          this.showCompleted = false;
        }
      });

    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = val;
        }
      });

    this.store
      .pipe(select(fromUpload.selectUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.showCompleted = true;
          this.showUploading = false;
        }
      });

    this.store
      .pipe(select(fromUpload.selectFilesToUpload))
      .subscribe((val: IFileModel) => {
        if (val !== null) {
          if (val.action === this.uploadAction) {
            this.filesToUpload = val.files;
            const files: IFileMetaData[] = val.files.reduce(
              (arr: IFileMetaData[], file) => {
                this.fileName = file["data"].name;
                const fileData = {
                  file: file["data"].name,
                  file_type: file["data"].type,
                };
                arr = [...arr, fileData];
                return arr;
              },
              []
            );

            var fileType = files[0].file_type.split("/");
            this.file = {
              mediaType: fileType[0],
              component: UPLOADCOMPONENT.contestentry,
              files: [...files],
            };

            this.store.dispatch(
              new UploadActions.GetPresignedUrl({ preSignRequest: this.file })
            );

            this.store.dispatch(new UploadActions.ResetFileInput());

            // perform actual upload to cloud
            if (this.filesToUpload.length > 0) {
              this.uploadFiles(this.filesToUpload);
            }
          }
        }
      });

    this.contestEntryForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.maxLength(150)),
      terms: new FormControl(false, Validators.requiredTrue),
    });
  }

  get newContest() {
    return this.contestEntryForm.controls;
  }

  uploadFiles(files: File[]): void {
    let uploadParams: CloudUploadParams[] = [];
    this.store
      .pipe(select(fromUpload.selectPresignedUrls))
      .subscribe((val: SignedUrl) => {
        if (val !== null) {
          if (val.component === this.uploadComponent) {
            this.uploadedItems = {
              type: MediaType.IMAGE,
              uploadType: MediaUploadType.single,
              items: [],
            };
            for (let i = 0; i < files.length; i++) {
              const item: CloudUploadParams = {
                file: files[i]["data"],
                url: val.presignedUrl[i].url,
              };
              uploadParams = [...uploadParams, item];

              const mediaItem: IMediaItem = {
                path: val.presignedUrl[i].key,
              };
              this.uploadedItems.items = [
                ...this.uploadedItems.items,
                mediaItem,
              ];
            }
            this.store.dispatch(new UploadActions.UploadFiles(uploadParams));

            const uploadExtension = this.uploadedItems.items[0].path
              .split(".")
              .pop();
            this.uploadedItems.type = AcceptedMedias[uploadExtension];

            this.store.dispatch(
              new UploadActions.SetUploadedItems({
                uploadedItems: this.uploadedItems,
              })
            );
          }
        }
      });
  }

  onClickBrowseBtn(mediaAccept: string) {
    const accept = MediaAcceptType[mediaAccept.toUpperCase()];
    this.fileConfig = {
      state: true,
      component: this.uploadComponent,
      action: this.uploadAction,
      multiple: false,
      accept,
      minHeight: 100,
      minWidth: 100,
    };
  }

  private closeModalDialog(modalId: string) {
    if (this.componentModal) {
      const modalToDeActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
      )[0];
      if (modalToDeActivate) {
        const modalToClose: IModal = {
          index: modalToDeActivate.index,
          name: modalToDeActivate.name,
          display: ModalDisplay.none,
          viewMode: ModalViewModel.none,
          contentType: "",
          data: null,
          modalCss: "",
          modalDialogCss: "",
          modalContentCss: "",
          showMagnifier: false,
        };
        this.store.dispatch(
          new ModalsActions.ToggleModal({
            appModal: this.componentModal,
            modal: modalToClose,
          })
        );
      }
    }
  }

  onSubmitEntry() {
    if (this.cloudItems.items) {
      const enterContestBtn = this.enterContestButton.nativeElement;
      this.renderer.setProperty(enterContestBtn, "disabled", true);

      const title: string = this.contestEntryForm.controls["title"].value;
      const info: string = this.contestEntryForm.controls["info"].value;
      const entryObj: IContestEntry = {
        title,
        contest: this.selectedContest.contest._id,
        additionalInfo: info || "",
        entry: this.cloudItems.items[0].path,
      };
      this.store.dispatch(
        new ContestEntryActions.EnterContest({
          newContestEntry: entryObj,
        })
      );

      this.closeModalDialog("new-entry");
    } else {
      this.store.dispatch(
        new NotificationActions.AddError({
          key: AppNotificationKey.error,
          message: `Please upload ${this.selectedContest.contest.entryMediaType.toLowerCase()} for submission.`,
          code: 400,
        })
      );
    }
  }
}
