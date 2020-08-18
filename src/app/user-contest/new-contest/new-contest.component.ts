import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from "@angular/forms";
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
  IService,
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
import { addDays } from "date-fns";
import { NUMERIC_REGEX } from "src/app/lib/constants";
import * as _ from "underscore";
import * as fromService from "../../shared/store/service/service.reducers";
import * as ServiceActions from "../../shared/store/service/service.actions";

@Component({
  selector: "app-new-contest",
  templateUrl: "./new-contest.component.html",
  styleUrls: ["./new-contest.component.css"],
})
export class NewContestComponent implements OnInit {
  contestForm: FormGroup;
  agreementForm: FormGroup;
  bannerImage: string = environment.CONTEST_BANNER_DEFAULT;
  defaultBannerImage: string = "";
  title = "";
  basicInfo = "";
  eligibityRule = "";
  submissionRule = "";
  contestDays = 1;
  informationLength: number = 250;
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
  defaultParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  isNewContest: boolean = true;
  private filesToUpload: File[];
  selectedCategories: string[] = [];
  bannerImageKey: string | null;
  selectedMediaType: string = "";
  showMediaTypes: boolean;
  contestButton: any;

  isInitiated$ = this.userContestStore.pipe(
    select(fromNewContest.selectNewContestInitiatedStatus)
  );

  inProgress$ = this.userContestStore.pipe(
    select(fromNewContest.selectNewContestInProgressStatus)
  );

  isCompleted$ = this.userContestStore.pipe(
    select(fromNewContest.selectNewContestCompletedStatus)
  );

  failed$ = this.userContestStore.pipe(
    select(fromNewContest.selectNewContestFailedStatus)
  );

  contestId: string = "";
  contestTitle: string = "";
  contestCode: string = "";
  contestInformation: string = "";
  contestBannerImage: string = "";
  contestEntryMediaType: string = "";
  eligibleCategories: string[] = [];
  evaluations: [];
  startDate: Date = new Date();
  endDate: Date = new Date();
  views: number = 0;
  createdBy: string = "";

  redeemable: FormArray = new FormArray([
    new FormGroup({
      reward: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(NUMERIC_REGEX),
          this.validateContestPrize,
        ])
      ),
    }),
  ]);

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

  minDate: Date = addDays(new Date(), 1);
  maxDate: Date = addDays(this.minDate, 30);
  contestDuration: Date[] = [];
  inEditMode: boolean = false;
  service: IService;
  @ViewChild("createButton", { static: false }) createButton: ElementRef;
  @ViewChild("prizeInput", { static: false }) prizeInput: ElementRef;
  @ViewChild("contestFm", { static: false }) contestFm: ElementRef;

  uploadInitiated$ = this.store.pipe(
    select(fromUpload.selectUploadInitiatedStatus)
  );

  uploadInProgress$ = this.store.pipe(
    select(fromUpload.selectUploadInProgressStatus)
  );

  uploadCompleted$ = this.store.pipe(
    select(fromUpload.selectUploadCompletedStatus)
  );
  canProceed: boolean = false;
  conditionAccepted: boolean = false;
  actionButtonText: string = "CREATE CONTEST";

  uploadFailed$ = this.store.pipe(select(fromUpload.selectUploadFailedStatus));

  uploadReady$ = this.store.pipe(select(fromUpload.selectUploadReadyStatus));
  // @ViewChild("titleInput", { static: false }) titleInput: ElementRef;
  constructor(
    public store: Store<fromApp.AppState>,
    private userContestStore: Store<fromUserContest.UserContestState>,
    private contestService: ContestService,
    private renderer: Renderer2
  ) {
    this.initForm();
    this.store
      .pipe(select(fromUpload.selectUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.store.dispatch(new UploadActions.UploadCompleted());
          this.fetchContestBanner();
        }
      });
    this.selectedMediaType = this.mediaTypes[0].name;

    this.store.dispatch(new ServiceActions.FetchServices());
  }

  ngOnInit() {
    this.initForm();
    this.agreementForm = new FormGroup({
      terms: new FormControl(false, Validators.requiredTrue),
    });

    this.store
      .pipe(select(fromService.selectAllServices))
      .take(2)
      .subscribe((val: IService[]) => {
        this.service = val.filter((x) => x.name === "Contest Setup")[0];
        if (this.service) {
          this.store.dispatch(
            new ServiceActions.FetchService({
              serviceId: this.service._id,
            })
          );
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

    this.isCompleted$.subscribe((val: boolean) => {
      if (val) {
        this.contestForm.reset();
      }
    });

    this.userContestStore
      .pipe(select(fromNewContest.selectAgreementStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.canProceed = true;
          this.actionButtonText = "UPDATE CONTEST";
          this.isNewContest = false;
          this.fetchContestInEditMode();
          this.contestForm.markAllAsTouched();
        }
      });
  }

  get agreement() {
    return this.agreementForm.controls;
  }

  private initForm() {
    this.contestForm = new FormGroup({
      title: new FormControl(
        this.contestTitle,
        [Validators.required, Validators.minLength(1)],
        contestTitleAsyncValidator(500, this.contestService).bind(this)
      ),
      basicInfo: new FormControl(this.contestInformation, [
        Validators.required,
        Validators.minLength(80),
        Validators.maxLength(250),
      ]),
      contestDuration: new FormControl(
        [this.minDate, this.maxDate],
        [Validators.required]
      ),
      contestRewards: this.redeemable,
      entryMedia: new FormControl(this.selectedMediaType),
    });
  }

  private fetchContestInEditMode(): void {
    this.userContestStore
      .pipe(select(fromNewContest.selectCurrentContest))
      .subscribe((val: IContest) => {
        if (_.has(val, "_id")) {
          this.contestId = val._id;
          this.contestTitle = val.title;
          this.contestCode = val.code;
          this.contestInformation = val.information;
          this.contestBannerImage = val.bannerImage;
          this.selectedMediaType =
            this.mediaTypes.filter((x) => x.name === val.entryMediaType)[0]
              .name || this.mediaTypes[0].name;
          this.selectedCategories = val.eligibleCategories;
          this.minDate = val.startDate;
          this.maxDate = val.endDate;
          this.views = val.views;
          this.createdBy = val.createdBy;
          if (val.redeemable) {
            this.contestRewards.removeAt(0);
            for (let i = 0; i < val.redeemable.length; i++) {
              this.redeemable.push(
                new FormGroup({
                  reward: new FormControl(val.redeemable[i].prizeCash),
                })
              );
            }
          }

          this.fetchContestBanner();
        }
        this.initForm();
      });
  }

  onClick() {
    this.showMediaTypes = !this.showMediaTypes;
  }

  ValidateContestDuration(control: AbstractControl) {
    if (!control.value[0] && !control.value[1]) {
      return { dateNotValid: true };
    }
    return null;
  }

  validateContestPrize(control: AbstractControl) {
    if (control.value < 1) {
      return { prizeNotValid: true };
    }
    return null;
  }

  validateInnerControl(control: AbstractControl) {
    if (control.value["reward"] < 1) {
      return { prizeNotValid: true };
    }
    return null;
  }

  onAcceptCondition() {
    this.conditionAccepted = !this.conditionAccepted;
  }

  onClickContinue(): void {
    this.canProceed = true;
  }

  onMouseLeave() {
    this.showMediaTypes = false;
  }

  onSelectedMedia(i: number) {
    this.selectedMediaType = this.mediaTypes[i].name;
    this.showMediaTypes = !this.showMediaTypes;
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
    const createBtn = this.createButton.nativeElement;
    this.renderer.setProperty(createBtn, "disabled", true);

    const formArray = <FormArray>this.contestForm.get("contestRewards");
    const duration = this.contestForm.controls["contestDuration"].value;
    if (!duration) {
      this.store.dispatch(
        new NotificationActions.AddError({
          key: AppNotificationKey.error,
          message: "Invalid contest duration",
          code: 400,
        })
      );
    } else {
      let redeemables: IRedeemable[] = [];
      for (let i = 0; i < formArray.length; i++) {
        const reward: string = (<FormArray>(
          this.contestForm.get("contestRewards")
        )).at(i).value;
        redeemables.push({
          name: `position${i + 1}`,
          prizeCash: reward["reward"],
        });
      }
      console.log(redeemables);

      const title: string = this.contestForm.controls["title"].value;
      const basicInfo: string = this.contestForm.controls["basicInfo"].value;
      // const eligibityRule: string = this.contestForm.controls["eligibityRule"]
      //   .value;
      // const submissionRule: string = this.contestForm.controls["submissionRule"]
      //   .value;
      // const entryMedia: number = this.contestForm.controls["entryMedia"].value;

      const contestObj: IContest = {
        title,
        information: basicInfo,
        bannerImage: this.bannerImageKey,
        eligibleCategories: [...this.selectedCategories],
        entryMediaType: this.selectedMediaType,
        startDate: new Date(duration[0]),
        endDate: new Date(duration[1]),
        redeemable: [...redeemables],
      };

      this.isNewContest = this.contestId === "" ? true : false;
      if (!this.isNewContest) {
        contestObj._id = this.contestId;
        this.userContestStore.dispatch(
          new NewContestActions.UpdateContest({ newContest: contestObj })
        );
      } else {
        this.userContestStore.dispatch(
          new NewContestActions.CreateContest({ newContest: contestObj })
        );
      }
    }
  }

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
      minHeight: 400,
      minWidth: 500,
    };
  }

  deleteReward(index: number) {
    if (this.contestRewards.length !== 1) {
      this.contestRewards.removeAt(index);
    } else {
      // do nothing
    }
  }

  fetchContestBanner() {
    this.userContestStore
      .pipe(select(fromNewContest.selectCurrentBannerKey))
      .subscribe((val: string) => {
        this.bannerImageKey = val || "";
        this.defaultBannerImage = fetchImageObjectFromCloudFormation(
          val,
          this.defaultParams
        );
        this.bannerImage =
          val !== null
            ? fetchImageObjectFromCloudFormation(val, this.editParams)
            : environment.CONTEST_BANNER_DEFAULT;
      });
  }

  onAddReward() {
    if ((<FormArray>this.contestForm.get("contestRewards")).length < 5) {
      const currentFormIndex = this.contestRewards.length - 1;
      if (this.contestRewards.at(currentFormIndex).value["reward"] > 0) {
        (<FormArray>this.contestForm.get("contestRewards")).push(
          new FormGroup({
            reward: new FormControl(null, Validators.required),
          })
        );
      } else {
        this.contestRewards.controls[currentFormIndex].setValidators(
          this.validateInnerControl
        );
      }
    } else {
      this.store.dispatch(
        new NotificationActions.AddInfo({
          key: AppNotificationKey.info,
          message: "You can only add 5 winners at once",
          code: 400,
        })
      );
    }
  }
}
