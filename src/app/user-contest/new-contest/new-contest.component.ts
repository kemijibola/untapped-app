import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import * as NotificationActions from "../../store/global/notification/notification.action";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import {
  AppNotificationKey,
  IFileInputModel,
  UPLOADOPERATIONS,
  MediaAcceptType,
} from "src/app/interfaces";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { contestTitleAsyncValidator } from "src/app/lib/Helper";
import { ContestService } from "src/app/services/contest.service";
import * as fromUpload from "../../shared/store/upload/upload.reducers";

@Component({
  selector: "app-new-contest",
  templateUrl: "./new-contest.component.html",
  styleUrls: ["./new-contest.component.css"],
})
export class NewContestComponent implements OnInit {
  contestForm: FormGroup;
  title = "";
  basicInfo = "";
  eligibityRule = "";
  submissionRule = "";
  contestDays = 1;
  contestDuration = "";
  evaluations: string[] = [];
  fileConfig: IFileInputModel;
  // rewardArray: FormArray = new FormArray([]);
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
    private contestService: ContestService
  ) {
    this.fetchContestBanner();
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

    // const formArray = <FormArray>this.contestForm.get("contestRewards");
    // formArray.controls.forEach((control) => {
    //   control.valueChanges.subscribe((val) => console.log(control));
    // });
  }

  onClickCreateButton() {
    console.log("clicked");
  }

  onAddEvaluation() {
    const evaluation: string = this.contestForm.controls["evaluation"].value;
    if (this.evaluations.length > 4) {
      this.store.dispatch(
        new NotificationActions.AddInfo({
          key: AppNotificationKey.error,
          message: "You can only add maximum 5 Evaluation criteria at once",
          code: 400,
        })
      );
    } else {
      if (evaluation !== "") {
        const foundEvaluation = this.evaluations.filter(
          (x) => x === evaluation.toLowerCase()
        )[0];
        if (!foundEvaluation) {
          this.evaluations.push(evaluation.toLowerCase());
          this.contestForm.controls["evaluation"].setValue("");
        } else {
          this.store.dispatch(
            new NotificationActions.AddInfo({
              key: AppNotificationKey.error,
              message: `${evaluation} has already been added to evaluation list`,
              code: 400,
            })
          );
        }
      }
    }
  }

  get contestRewards(): FormArray {
    return this.contestForm.get("contestRewards") as FormArray;
  }

  onClickBrowseBtn() {
    this.fileConfig = {
      state: true,
      process: UPLOADOPERATIONS.ContestBanner,
      multiple: false,
      accept: MediaAcceptType.IMAGE,
      minHeight: 300,
      minWidth: 500,
    };
  }
  deleteReward(index: number) {
    if ((<FormArray>this.contestForm.get("contestRewards")).length !== 1) {
      (<FormArray>this.contestForm.get("contestRewards")).removeAt(index);
    }
  }

  fetchContestBanner() {}
  deleteEvaluation() {}
  onAddReward() {
    console.log((<FormArray>this.contestForm.get("contestRewards")).length);
    if ((<FormArray>this.contestForm.get("contestRewards")).length < 2) {
      (<FormArray>this.contestForm.get("contestRewards")).push(
        new FormGroup({
          reward: new FormControl("", Validators.required),
        })
      );
    } else {
      this.store.dispatch(
        new NotificationActions.AddInfo({
          key: AppNotificationKey.error,
          message: "You can only add 2 winners at once",
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
