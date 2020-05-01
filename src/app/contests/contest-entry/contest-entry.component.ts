import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  IFileInputModel,
  UPLOADOPERATIONS,
  MediaAcceptType,
  IFileModel,
  IFileMetaData,
  CloudUploadParams,
  SignedUrl,
  IPresignRequest,
} from "./../../interfaces/shared/file";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  ContestData,
  UploadedItems,
  IContestEntry,
  IMediaItem,
  MediaType,
  AppNotificationKey,
} from "src/app/interfaces";
import * as fromApp from "../../store/app.reducers";
import * as fromContest from "../store/contests.reducers";
import { Store, select } from "@ngrx/store";
import * as fromUpload from "src/app/shared/store/upload/upload.reducers";
import * as ContestEntryActions from "../store/contest-entry/contest-entry.action";
import * as UploadActions from "../../shared/store/upload/upload.actions";
import { AcceptedMedias } from "src/app/interfaces/media/image";
import * as NotificationActions from "../../store/global/notification/notification.action";
@Component({
  selector: "app-contest-entry",
  templateUrl: "./contest-entry.component.html",
  styleUrls: ["./contest-entry.component.css"],
})
export class ContestEntryComponent implements OnInit, OnChanges {
  fileConfig: IFileInputModel;
  private filesToUpload: File[];
  private file: IPresignRequest;
  uploadOperation = UPLOADOPERATIONS.contestentry;
  mediaAccept: string;
  contestEntryForm: FormGroup;
  @Input() selectedContest: ContestData;
  uploadedItems: UploadedItems;
  cloudItems: UploadedItems;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .pipe(select(fromUpload.selectCurrentUploadedItem))
      .subscribe((val: UploadedItems) => {
        this.cloudItems = { ...val };
      });

    this.store
      .pipe(select(fromUpload.selectFilesToUpload))
      .subscribe((val: IFileModel) => {
        if (val !== null) {
          if (val.action === this.uploadOperation) {
            this.filesToUpload = val.files;
            const files: IFileMetaData[] = val.files.reduce(
              (arr: IFileMetaData[], file) => {
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
              action: val.action,
              files: [...files],
            };
            if (this.fileConfig.state) {
              this.store.dispatch(
                new UploadActions.GetPresignedUrl({ preSignRequest: this.file })
              );
            }

            this.store.dispatch(new UploadActions.ResetFileInput());

            // perform actual upload to cloud
            if (this.filesToUpload.length > 0) {
              this.uploadFiles(this.filesToUpload);
            }
          }
        }
      });

    this.contestEntryForm = new FormGroup({
      title: new FormControl("", Validators.required),
      info: new FormControl("", Validators.maxLength(150)),
    });
  }

  uploadFiles(files: File[]): void {
    let uploadParams: CloudUploadParams[] = [];
    this.store
      .pipe(select(fromUpload.selectPresignedUrls))
      .subscribe((val: SignedUrl) => {
        if (val !== null) {
          if (val.action === this.uploadOperation) {
            this.uploadedItems = {
              type: MediaType.IMAGE,
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

  ngOnChanges(simple: SimpleChanges) {
    if (simple["selectedContest"]) {
      this.mediaAccept =
        MediaAcceptType[
          this.selectedContest.contest.entryMediaType.toUpperCase()
        ];
    }
  }
  onClickBrowseBtn() {
    this.fileConfig = {
      state: true,
      process: this.uploadOperation,
      multiple: false,
      accept: this.mediaAccept,
      minHeight: 100,
      minWidth: 100,
    };
  }
  onSubmitEntry() {
    if (this.cloudItems.items.length > 0) {
      const title: string = this.contestEntryForm.controls["title"].value;
      const info: string = this.contestEntryForm.controls["info"].value;
      const entryObj: IContestEntry = {
        title,
        contest: this.selectedContest.contest._id,
        additionalInfo: info || "",
        entry: this.cloudItems.items[0].path,
      };
      console.log(entryObj);
      this.store.dispatch(
        new ContestEntryActions.EnterContest({
          newContestEntry: entryObj,
        })
      );
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
