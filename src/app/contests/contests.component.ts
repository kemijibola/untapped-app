import { Component, OnInit, OnDestroy } from "@angular/core";
import * as fromContests from "../contests/store/contests.reducers";
import * as ContestsAction from "../contests/store/contests.action";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import { IContestList } from "../interfaces";
import { Observable } from "rxjs";

@Component({
  selector: "app-contests",
  templateUrl: "./contests.component.html",
  styleUrls: ["./contests.component.css"],
})
export class ContestsComponent implements OnInit, OnDestroy {
  page: number = 1;
  perPage: number = 9;
  contests: IContestList[] = [];
  contests$: Observable<IContestList[]> = this.store.pipe(
    select(fromContests.selectAllContestsPreviews)
  );
  constructor(public store: Store<fromApp.AppState>) {
    // TODO:: on each image, instead of entries at the top
    // change it to start Date
  }

  ngOnInit() {
    this.fetchRunningContests();

    console.log("here");
    // this.store
    //   .pipe(select(fromContests.selectAllContestsPreviews))
    //   .subscribe((val: IContestList[]) => {
    //     this.contests = val;
    //     console.log(this.contests);
    //   });
  }

  onScroll() {
    console.log("scroll called");
    this.page++;
    this.fetchRunningContests();
  }

  fetchRunningContests() {
    this.store.dispatch(
      new ContestsAction.FetchContestsPreview({
        perPage: this.perPage,
        page: this.page,
      })
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new ContestsAction.ResetContestsPreviewToDefault());
  }
}
