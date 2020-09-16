import {
  IUserContestListAnalysis,
  AllContestViewModel,
  CompetitionParticipant,
} from "./../../interfaces/user/filter-category";
import { Component, OnInit } from "@angular/core";
import * as NewContestActions from "../../user-contest/store/new-contest/new-contest.actions";
import * as fromUserContest from "../../user-contest/user-contest.reducers";
import * as fromAllContest from "../store/all-contest/all-contest.reducers";
import * as AllContestActions from "../store/all-contest/all-contest.actions";
import * as fromNewContest from "../../user-contest/store/new-contest/new-contest.reducers";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import {
  fetchImageObjectFromCloudFormation,
  fetchDefaultContestBanner,
} from "src/app/lib/Helper";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import * as _ from "underscore";
import { ExcelService } from "src/app/shared/utils/excel.service";
import { IVoteResult } from "src/app/interfaces";

@Component({
  selector: "app-all-contest",
  templateUrl: "./all-contest.component.html",
  styleUrls: ["./all-contest.component.css"],
})
export class AllContestComponent implements OnInit {
  page: number = 1;
  perPage: number = 9;
  userContests: AllContestViewModel[] = [];
  dtOptions: DataTables.Settings = {
    pagingType: "full_numbers",
    pageLength: 10,
    processing: true,
  };
  selectedIndex: number = -1;
  showContent: boolean = false;
  downloadParticipants: boolean = false;
  downloadResult: boolean = false;

  codeInitiated$ = this.userContestStore.pipe(
    select(fromAllContest.selectDownloadCodeInitiatedStatus)
  );

  codeProgress$ = this.userContestStore.pipe(
    select(fromAllContest.selectDownloadCodeInProgressStatus)
  );

  codeCompleted$ = this.userContestStore.pipe(
    select(fromAllContest.selectDownloadCodeCompletedStatus)
  );

  codeFailed$ = this.userContestStore.pipe(
    select(fromAllContest.selectDownloadCodeFailedStatus)
  );

  resultInitiated$ = this.userContestStore.pipe(
    select(fromAllContest.selectDownloadResultInitiatedStatus)
  );

  resultProgress$ = this.userContestStore.pipe(
    select(fromAllContest.selectDownloadResultInProgressStatus)
  );

  resultCompleted$ = this.userContestStore.pipe(
    select(fromAllContest.selectDownloadResultCompletedStatus)
  );

  resultFailed$ = this.userContestStore.pipe(
    select(fromAllContest.selectDownloadResultFailedStatus)
  );

  constructor(
    public store: Store<fromApp.AppState>,
    private userContestStore: Store<fromUserContest.UserContestState>,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new AllContestActions.FetchUserContestList({
        perPage: this.perPage,
        page: this.page,
      })
    );

    this.userContestStore
      .pipe(select(fromAllContest.selectAllUserContests))
      .subscribe((val: AllContestViewModel[]) => {
        if (val) {
          this.userContests = val;
        }
      });

    this.userContestStore
      .pipe(select(fromAllContest.selectContestParticipants))
      .subscribe((val: CompetitionParticipant[]) => {
        if (val && this.downloadParticipants) {
          this.excelService.exportAsExcelFile(
            val,
            `${val[0].competition_code}_participants_${new Date()}`
          );
          this.downloadParticipants = false;
        }
      });

    this.userContestStore
      .pipe(select(fromAllContest.selectContestResult))
      .subscribe((val: IVoteResult[]) => {
        if (val && this.downloadResult) {
          this.excelService.exportAsExcelFile(
            val,
            `${val[0].competition_code}_result_${Date.now()}`
          );
          this.downloadResult = false;
        }
      });
  }

  trackByFn(index: number, item: IUserContestListAnalysis) {
    return item.contestId;
  }

  selectedRow(index: number): void {
    this.selectedIndex = index;
  }

  onClickDownloadParticipantData(contestId: string): void {
    this.userContestStore.dispatch(
      new AllContestActions.FetchCompetitionParticipants({ contestId })
    );
    this.downloadParticipants = true;
  }

  onClickDownloadVoteResult(contestId: string): void {
    this.userContestStore.dispatch(
      new AllContestActions.FetchCompetitionResult({ contestId })
    );
    this.downloadResult = true;
  }
}
