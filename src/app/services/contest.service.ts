import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  IResult,
  IContestList,
  IContest,
  IUserContest,
  IContestIssue,
  ContestData,
  IContestEntry,
  ContestEligibilityData,
  IUserContestListAnalysis,
  AllContestViewModel,
  CompetitionParticipant,
  IVoteResult,
} from "../interfaces";
import { Observable } from "rxjs";
import { IJudge } from "../interfaces/contests/Judge";
import { ContestWithEntriesPreview } from "../interfaces/shared/dashboard";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class ContestService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = environment.BASE_URL;
  }
  fetchContestPreviews(
    pageNo: number,
    size: number
  ): Observable<IResult<IContestList[]>> {
    const url = `${this.BASE_URI}/contests/preview/list?pageNo=${pageNo}&size=${size}`;
    return this.http.get<IResult<IContestList[]>>(url);
  }

  fetchContest(_id: string): Observable<IResult<ContestData>> {
    const url = `${this.BASE_URI}/contests/${_id}`;
    return this.http.get<IResult<ContestData>>(url);
  }

  checkUserEligibility(
    contestId: string
  ): Observable<IResult<ContestEligibilityData>> {
    const url = `${this.BASE_URI}/contest-entries/${contestId}/user`;
    return this.http.get<IResult<ContestEligibilityData>>(url);
  }

  fetchUserContests(): Observable<IResult<IUserContest[]>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.get<IResult<IUserContest[]>>(url);
  }

  findContestByTitle(title: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/contests/validate/title`;
    return this.http.get<IResult<boolean>>(`${url}?title=${title}`);
  }

  fetchRunningContests(): Observable<IResult<ContestWithEntriesPreview[]>> {
    const url = `${this.BASE_URI}/contests/dashboard/runningcontests`;
    return this.http.get<IResult<ContestWithEntriesPreview[]>>(url);
  }

  fetchUserParticipatedContests(): Observable<
    IResult<IUserContestListAnalysis[]>
  > {
    const url = `${this.BASE_URI}/contest-entries/user`;
    return this.http.get<IResult<IUserContestListAnalysis[]>>(url);
  }

  postContestLike(contestId: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/contests/${contestId}/like`;
    return this.http.put<IResult<boolean>>(url, {});
  }

  postContestUnLike(contestId: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/contests/${contestId}/unLike`;
    return this.http.put<IResult<boolean>>(url, {});
  }

  fetchContestsCreatedByUser(
    pageNo: number,
    size: number
  ): Observable<IResult<AllContestViewModel[]>> {
    const url = `${this.BASE_URI}/contests/user/contests/?pageNo=${pageNo}&size=${size}`;
    return this.http.get<IResult<AllContestViewModel[]>>(url);
  }

  fetchContestParticipants(
    contestId: string
  ): Observable<IResult<CompetitionParticipant[]>> {
    const url = `${this.BASE_URI}/contests/${contestId}/participants`;
    return this.http.get<IResult<CompetitionParticipant[]>>(url);
  }

  fetchUserCompetitionResult(
    contestId: string
  ): Observable<IResult<IVoteResult[]>> {
    const url = `${this.BASE_URI}/votes/contests/${contestId}/result`;
    return this.http.get<IResult<IVoteResult[]>>(url);
  }

  createContest(item: IContest): Observable<IResult<IContest>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.post<IResult<IContest>>(url, item);
  }

  createSMSContest(item: IContest): Observable<IResult<IContest>> {
    const url = `${this.BASE_URI}/contests/sms-vote/competition`;
    return this.http.post<IResult<IContest>>(url, item);
  }

  updateContest(data: IContest): Observable<IResult<IContest>> {
    const url = `${this.BASE_URI}/contests/${data._id}`;
    return this.http.put<IResult<IContest>>(url, data);
  }

  postContestPageView(id: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/contests/${id}/page-count`;
    return this.http.put<IResult<boolean>>(url, {});
  }

  enterContest(item: IContestEntry): Observable<IResult<IContestEntry>> {
    const url = `${this.BASE_URI}/contest-entries`;
    return this.http.post<IResult<IContestEntry>>(url, item);
  }

  createContestIssue(item: IContestIssue): Observable<IResult<IContestIssue>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.post<IResult<IContestIssue>>(url, item);
  }

  updateContestWithJudge(
    _id: string,
    judges: IJudge[]
  ): Observable<IResult<IContest>> {
    const url = `${this.BASE_URI}/contests/${_id}`;
    return this.http.patch<IResult<IContest>>(url, {
      judges: judges,
    });
  }
}
