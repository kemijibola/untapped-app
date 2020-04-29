import { ImageFit } from "./../../../interfaces/media/image";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromOrder from "../../../shared/store/order/order.reducers";
import { IOrder, IContest, PaymentProcessor } from "src/app/interfaces";
import * as fromUserContest from "../../../user-contest/user-contest.reducers";
import * as fromNewContest from "../../../user-contest/store/new-contest/new-contest.reducers";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import { environment } from "src/environments/environment";
import { ImageEditRequest } from "src/app/interfaces/media/image";

@Component({
  selector: "app-new-contest-success",
  templateUrl: "./new-contest-success.component.html",
  styleUrls: ["./new-contest-success.component.css"],
})
export class NewContestSuccessComponent implements OnInit {
  bannerImage = "";
  currentOrder: IOrder = {
    service: "",
    processor: PaymentProcessor.banktransfer,
    order: {
      amount: 0,
      items: [],
      totalAmount: 0,
      quantity: 0,
      orderNumber: "",
    },
  };
  currentContest: IContest = {
    _id: "",
    title: "",
    code: "",
    information: "",
    bannerImage: "",
    entryMediaType: "",
    eligibleCategories: [],
    evaluations: [],
    eligibilityInfo: "",
    submissionRules: "",
    startDate: null,
    endDate: null,
    views: 0,
    likes: 0,
    createdBy: "",
    redeemable: [],
  };
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 366.33,
        height: 300.14,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  constructor(
    private store: Store<fromApp.AppState>,
    private userContestStore: Store<fromUserContest.UserContestState>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(fromOrder.selectCurrentOrder))
      .subscribe((val: IOrder) => {
        if (val !== null) {
          this.currentOrder = { ...val };
        }
      });

    this.userContestStore
      .pipe(select(fromNewContest.selectCurrentContest))
      .subscribe((val: IContest) => {
        if (val !== null) {
          this.currentContest = { ...val };
          this.fetchContestBanner(val.bannerImage);
        }
      });
  }

  fetchContestBanner(bannerImageKey: string) {
    this.bannerImage =
      bannerImageKey !== undefined
        ? fetchImageObjectFromCloudFormation(bannerImageKey, this.editParams)
        : environment.CONTEST_BANNER_DEFAULT;
  }

  onViewContestDetail(): void {}
}
