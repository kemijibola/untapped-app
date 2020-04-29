import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import * as fromContest from "../store/contests.reducers";
import * as ContestsAction from "../store/contests.action";
import { ContestData, CategoryType } from "src/app/interfaces";
import * as fromCategoryType from "../../shared/store/category-type/category-type.reducers";
import { differenceInDays, isPast } from "date-fns";
import {
  fetchImageObjectFromCloudFormation,
  fetchDefaultContestBanner,
} from "src/app/lib/Helper";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";

@Component({
  selector: "app-contest-details",
  templateUrl: "./contest-details.component.html",
  styleUrls: ["./contest-details.component.css"],
})
export class ContestDetailsComponent implements OnInit {
  contestId: string | null;
  eligibleCategories: string = "";
  differenceInDays: string = "";
  hasEnded: boolean = false;
  fullBannerImage: string = "";
  entriesCount: number = 0;
  contestDetails: ContestData = {
    contest: {
      title: "",
      information: "",
      bannerImage: "",
      entryMediaType: "",
      startDate: new Date(),
      endDate: new Date(),
      redeemable: [],
    },
    submissions: [],
  };
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
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contestId = this.route.snapshot.params.id;
    if (this.contestId !== null) {
      this.store.dispatch(
        new ContestsAction.FetchContestById({ id: this.contestId })
      );

      this.setContestBannerImage("");

      this.store
        .pipe(select(fromContest.selectCurrentContestDetails))
        .subscribe((val: ContestData) => {
          if (val !== null) {
            this.entriesCount = val.submissions.length;
            this.setContestBannerImage(val.contest.bannerImage);
            if (isPast(new Date(val.contest.endDate))) this.hasEnded = true;
            this.contestDetails = { ...val };
            const difference: number = differenceInDays(
              new Date(val.contest.endDate),
              new Date(val.contest.startDate)
            );
            this.differenceInDays =
              difference > 1 ? `${difference} days` : `${difference} day`;
            if (val.contest.eligibleCategories.length > 0) {
              this.mapSelectedCategories();
            }
          }
        });
    }
  }

  setContestBannerImage(bannerImageKey: string) {
    this.fullBannerImage =
      bannerImageKey === ""
        ? fetchImageObjectFromCloudFormation(bannerImageKey, this.editParams)
        : fetchDefaultContestBanner();
  }

  mapSelectedCategories() {
    this.store
      .pipe(select(fromCategoryType.selectAllCategoryTypes))
      .subscribe((val: CategoryType[]) => {
        if (val.length > 0) {
          if (this.contestDetails.contest.eligibleCategories.length > 0) {
            for (
              let i = 0;
              i < this.contestDetails.contest.eligibleCategories.length;
              i++
            ) {
              const found = val.filter(
                (x) =>
                  x._id === this.contestDetails.contest.eligibleCategories[i]
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
}
