import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import * as NotificationActions from "../../store/global/notification/notification.action";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import {
  AppNotificationKey,
  IFileInputModel,
  MediaAcceptType,
  IPresignRequest,
  IFileMetaData,
  CloudUploadParams,
  SignedUrl,
  IFileModel,
  IContest,
  IRedeemable,
  UPLOADCOMPONENT,
  UPLOADACTION,
} from "src/app/interfaces";
import {
  contestTitleAsyncValidator,
  fetchImageObjectFromCloudFormation,
} from "src/app/lib/Helper";
import { ContestService } from "src/app/services/contest.service";
import * as fromUpload from "../../shared/store/upload/upload.reducers";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import * as UploadActions from "../../shared/store/upload/upload.actions";
import * as NewContestActions from "../../user-contest/store/new-contest/new-contest.actions";
import * as fromUserContest from "../../user-contest/user-contest.reducers";
import * as fromNewContest from "../../user-contest/store/new-contest/new-contest.reducers";
import { environment } from "src/environments/environment.dev";
import * as fromCategoryType from "src/app/shared/store/category-type/category-type.reducers";

@Component({
  selector: "app-new-contest",
  templateUrl: "./new-contest.component.html",
  styleUrls: ["./new-contest.component.css"],
})
export class NewContestComponent implements OnInit {
  contestForm: FormGroup;
  bannerImage: string = environment.CONTEST_BANNER_DEFAULT;
  title = "";
  basicInfo = "";
  eligibityRule = "";
  submissionRule = "";
  contestDays = 1;
  contestDuration = "";
  // evaluations: string[] = [];
  fileConfig: IFileInputModel;
  private presignRequest: IPresignRequest;
  uploadComponent = UPLOADCOMPONENT.contestbanner;
  uploadAction = UPLOADACTION.uploadcontestbanner;
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 482.91,
        height: 395.66,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  private filesToUpload: File[];
  selectedCategories: string[] = [];
  bannerImageKey: string | null;

  formatLabel(value: number = 3) {
    if (value >= 1) {
      return Math.round(value / 1) + "d";
    }
    return value;
  }
  mediaTypes = [
    { id: 0, name: "Audio", selected: true },
    { id: 1, name: "Video", selected: false },
    { id: 2, name: "Image", selected: false },
  ];

  constructor(
    public store: Store<fromApp.AppState>,
    private userContestStore: Store<fromUserContest.UserContestState>,
    private contestService: ContestService
  ) {
    // this.bannerImage = environment.CONTEST_BANNER_DEFAULT;
    this.store
      .pipe(select(fromUpload.selectUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.fetchContestBanner();
        }
      });
  }

  ngOnInit() {
    this.contestForm = new FormGroup({
      title: new FormControl(
        null,
        [Validators.required, Validators.minLength(1)],
        contestTitleAsyncValidator(500, this.contestService).bind(this)
      ),
      basicInfo: new FormControl(null, [
        Validators.required,
        Validators.minLength(20),
      ]),
      eligibityRule: new FormControl(null),
      submissionRule: new FormControl(null),
      contestDuration: new FormControl(null),
      contestRewards: new FormArray([
        new FormGroup({
          reward: new FormControl("", Validators.required),
        }),
      ]),
      entryMedia: new FormControl(null),
      evaluation: new FormControl(null),
    });

    this.store
      .pipe(select(fromUpload.selectFilesToUpload))
      .subscribe((val: IFileModel) => {
        if (val !== null) {
          if (val.action === this.uploadAction) {
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
            this.presignRequest = {
              mediaType: fileType[0],
              component: this.uploadComponent,
              files: [...files],
            };

            this.store.dispatch(
              new UploadActions.GetPresignedUrl({
                preSignRequest: this.presignRequest,
              })
            );

            this.store.dispatch(new UploadActions.ResetFileInput());

            // perform actual upload to cloud
            if (this.filesToUpload.length > 0) {
              this.uploadFiles(this.filesToUpload);
            }
          }
        }
      });

    this.store
      .pipe(select(fromCategoryType.selectSelectedCategoryTypes))
      .subscribe((val: string[]) => {
        this.selectedCategories = [...val];
      });
  }

  uploadFiles(files: File[]): void {
    let uploadParams: CloudUploadParams[] = [];
    this.store
      .pipe(select(fromUpload.selectPresignedUrls))
      .subscribe((val: SignedUrl) => {
        if (val) {
          if (val.component === this.uploadComponent) {
            const item: CloudUploadParams = {
              file: files[0]["data"],
              url: val.presignedUrl[0].url,
            };
            uploadParams = [...uploadParams, item];
            this.store.dispatch(new UploadActions.UploadFiles(uploadParams));

            // update store with contest banner

            this.userContestStore.dispatch(
              new NewContestActions.SetContestBanner({
                bannerKey: val.presignedUrl[0].key,
              })
            );
          }
        }
      });
  }

  onClickCreateButton() {
    console.log("clicked");
    const formArray = <FormArray>this.contestForm.get("contestRewards");
    const duration = this.contestForm.controls["contestDuration"].value;
    let redeemables: IRedeemable[] = [];
    for (let i = 0; i < formArray.length; i++) {
      const reward: string = (<FormArray>(
        this.contestForm.get("contestRewards")
      )).at(i).value;
      redeemables.push({
        name: `Winner ${i + 1}`,
        prizeCash: reward["reward"],
      });
    }

    const title: string = this.contestForm.controls["title"].value;
    const basicInfo: string = this.contestForm.controls["basicInfo"].value;
    const eligibityRule: string = this.contestForm.controls["eligibityRule"]
      .value;
    const submissionRule: string = this.contestForm.controls["submissionRule"]
      .value;
    const entryMedia: number = this.contestForm.controls["entryMedia"].value;

    const contestObj: IContest = {
      title,
      information: basicInfo,
      bannerImage: this.bannerImageKey,
      eligibleCategories: [...this.selectedCategories],
      eligibilityInfo: eligibityRule,
      entryMediaType: this.mediaTypes.filter((x) => x.id === entryMedia)[0]
        .name,
      submissionRules: submissionRule,
      startDate: new Date(duration[0]),
      endDate: new Date(duration[1]),
      redeemable: [...redeemables],
    };

    this.userContestStore.dispatch(
      new NewContestActions.CreateContest({ newContest: contestObj })
    );
  }

  // onAddEvaluation() {
  //   const evaluation: string = this.contestForm.controls["evaluation"].value;
  //   if (this.evaluations.length > 4) {
  //     this.store.dispatch(
  //       new NotificationActions.AddInfo({
  //         key: AppNotificationKey.error,
  //         message: "You can only add maximum 5 Evaluation criteria at once",
  //         code: 400,
  //       })
  //     );
  //   } else {
  //     if (evaluation !== "") {
  //       const foundEvaluation = this.evaluations.filter(
  //         (x) => x === evaluation.toLowerCase()
  //       )[0];
  //       if (!foundEvaluation) {
  //         this.evaluations.push(evaluation.toLowerCase());
  //         this.contestForm.controls["evaluation"].setValue("");
  //       } else {
  //         this.store.dispatch(
  //           new NotificationActions.AddInfo({
  //             key: AppNotificationKey.error,
  //             message: `${evaluation} has already been added to evaluation list`,
  //             code: 400,
  //           })
  //         );
  //       }
  //     }
  //   }
  // }

  get contestRewards(): FormArray {
    return this.contestForm.get("contestRewards") as FormArray;
  }

  onClickBrowseBtn() {
    this.fileConfig = {
      state: true,
      component: this.uploadComponent,
      action: this.uploadAction,
      multiple: false,
      accept: MediaAcceptType.IMAGE,
      minHeight: 150,
      minWidth: 100,
    };
  }
  deleteReward(index: number) {
    if ((<FormArray>this.contestForm.get("contestRewards")).length !== 1) {
      (<FormArray>this.contestForm.get("contestRewards")).removeAt(index);
    }
  }

  fetchContestBanner() {
    this.userContestStore
      .pipe(select(fromNewContest.selectCurrentBannerKey))
      .subscribe((val: string) => {
        this.bannerImageKey = val || "";

        this.bannerImage =
          val !== null
            ? fetchImageObjectFromCloudFormation(val, this.editParams)
            : environment.CONTEST_BANNER_DEFAULT;
        console.log(this.bannerImage);
      });
  }

  deleteEvaluation() {}
  onAddReward() {
    if ((<FormArray>this.contestForm.get("contestRewards")).length < 3) {
      (<FormArray>this.contestForm.get("contestRewards")).push(
        new FormGroup({
          reward: new FormControl("", Validators.required),
        })
      );
    } else {
      this.store.dispatch(
        new NotificationActions.AddInfo({
          key: AppNotificationKey.error,
          message: "You can only add 3 winners at once",
          code: 400,
        })
      );
    }
  }

  // onFormSubmit(): void {
  //   for (let i = 0; i < this.names.length; i++) {
  //     console.log(this.names.at(i).value);
  //   }
  // }
  onCreateClicked() {}
  // TODO:: on click of proceed to payment, order is created
  // payment is sent to payment gateway
  // On success, update order collection, contest collection and payment collection
}
