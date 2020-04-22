import { Component, OnInit } from "@angular/core";
import * as fromNewContestActions from "../../../user-contest/store/new-contest/new-contest.actions";
import * as fromUserContest from "../../../user-contest/user-contest.reducers";
import * as fromNewContest from "../../../user-contest/store/new-contest/new-contest.reducers";
import { Store, select } from "@ngrx/store";
import { IContest, CategoryType, IAuthData } from "src/app/interfaces";
import * as fromApp from "../../../store/app.reducers";
// import * as fromCategoryType from "../../store/category-type/category-type.reducers";
import * as fromCategoryType from "../../../shared/store/category-type/category-type.reducers";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import { differenceInDays } from "date-fns";
import * as fromAuth from "src/app/account/store/auth.reducers";

@Component({
  selector: "app-new-contest-overview",
  templateUrl: "./new-contest-overview.component.html",
  styleUrls: ["./new-contest-overview.component.css"],
})
export class NewContestOverviewComponent implements OnInit {
  contestInEdit: IContest = {
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
  differenceInDays: string = "";
  bannerImage: string = "";
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
  eligibleCategories: string;
  paystackClientKey: string = environment.PAYSTACK_CLIENT_KEY;
  userData: IAuthData;
  userEmail: string;
  refKey: string;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private userContestStore: Store<fromUserContest.UserContestState>
  ) {}

  ngOnInit(): void {
    // get current user
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.userEmail = val.user_data.email;
          this.userData = { ...val };
        }
      });

    this.generatePaymentKey();

    this.userContestStore
      .pipe(select(fromNewContest.selectCurrentContest))
      .subscribe((val: IContest) => {
        if (val !== null) {
          this.fetchContestBanner(val.bannerImage);
          this.contestInEdit = { ...val };
          const difference: number = differenceInDays(
            new Date(val.endDate),
            new Date(val.startDate)
          );
          this.differenceInDays =
            difference > 1 ? `${difference} days` : `${difference} day`;
          console.log(this.differenceInDays);
          if (val.eligibleCategories.length > 0) {
            this.mapSelectedCategories();
          }
        } else {
          this.router.navigate(["/user/contest/page/"], {
            queryParams: { tab: "new" },
          });
        }
      });
  }

  fetchContestBanner(bannerImageKey: string) {
    console.log(bannerImageKey);
    this.bannerImage =
      bannerImageKey !== undefined
        ? fetchImageObjectFromCloudFormation(bannerImageKey, this.editParams)
        : environment.CONTEST_BANNER_DEFAULT;
  }

  mapSelectedCategories() {
    this.store
      .pipe(select(fromCategoryType.selectAllCategoryTypes))
      .subscribe((val: CategoryType[]) => {
        if (val.length > 0) {
          if (this.contestInEdit.eligibleCategories.length > 0) {
            for (
              let i = 0;
              i < this.contestInEdit.eligibleCategories.length;
              i++
            ) {
              const found = val.filter(
                (x) => x._id === this.contestInEdit.eligibleCategories[i]
              )[0];
              if (found) {
                if (i === 0) {
                  this.eligibleCategories = `${found.name}`;
                } else {
                  this.eligibleCategories = `${this.eligibleCategories}, ${found.name}`;
                }
              }
            }
          }
        }
      });
  }

  paymentInit() {
    console.log("Payment initialized");
  }

  generatePaymentKey() {
    this.refKey =
      (this.userData ? this.userData.user_data._id.substr(20) : "") +
      new Date().getTime();
  }
  paymentCancel() {
    console.log("canceled");
  }

  paymentDone(data) {
    console.log(data);
  }
}
