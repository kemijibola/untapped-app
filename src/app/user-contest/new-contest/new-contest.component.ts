import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import * as NotificationActions from "../../store/global/notification/notification.action";
import * as fromApp from "../../store/app.reducers";
import { Store } from "@ngrx/store";
import { AppNotificationKey } from "src/app/interfaces";

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
  // rewardArray: FormArray = new FormArray([]);
  formatLabel(value: number = 3) {
    if (value >= 1) {
      return Math.round(value / 1) + "d";
    }
    return value;
  }
  PrizeTypes = [
    { id: 1, name: "Cash", selected: true },
    { id: 2, name: "Other", selected: false },
  ];

  constructor(public store: Store<fromApp.AppState>) {}

  ngOnInit() {
    // TODO:: get current index at array, set show text to true, show textarea
    (<FormArray>this.contestForm.get("contestRewards")).at;

    this.contestForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      basicInfo: new FormControl(null, [
        Validators.required,
        Validators.minLength(20),
      ]),
      eligibityRule: new FormControl(null),
      submissionRule: new FormControl(null),
      noOfContestDays: new FormControl(1, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(14),
      ]),
      contestRewards: new FormArray([
        new FormGroup({
          reward: new FormControl("", Validators.required),
          prizeType: new FormControl("", Validators.required),
        }),
      ]),
    });
  }

  get contestRewards(): FormArray {
    return this.contestForm.get("contestRewards") as FormArray;
  }

  deleteReward(index: number) {
    if ((<FormArray>this.contestForm.get("contestRewards")).length !== 1) {
      (<FormArray>this.contestForm.get("contestRewards")).removeAt(index);
    }
  }

  onAddReward() {
    console.log((<FormArray>this.contestForm.get("contestRewards")).length);
    if ((<FormArray>this.contestForm.get("contestRewards")).length < 2) {
      (<FormArray>this.contestForm.get("contestRewards")).push(
        new FormGroup({
          reward: new FormControl("", Validators.required),
          prizeType: new FormControl("", Validators.required),
        })
      );
    } else {
      this.store.dispatch(
        new NotificationActions.AddError({
          key: AppNotificationKey.error,
          message: "You can only add 3 winners at once",
          code: 400,
        })
      );
      // window.alert("you have reached max number of reward");
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
