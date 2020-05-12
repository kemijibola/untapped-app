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
} from "../interfaces";
import { Observable } from "rxjs";
import { IJudge } from "../interfaces/contests/Judge";

@Injectable({ providedIn: "root" })
export class ContestService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = "http://127.0.0.1:8900/v1";
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
    console.log("network service");
    const url = `${this.BASE_URI}/contest-entries/${contestId}/user`;
    return this.http.get<IResult<ContestEligibilityData>>(url);
  }

  fetchUserContests(): Observable<IResult<IUserContest[]>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.get<IResult<IUserContest[]>>(url);
  }

  findContestByTitle(title: string): Observable<IResult<IContest[]>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.get<IResult<IContest[]>>(`${url}?title=${title}`);
  }

  fetchUserParticipatedContests(): Observable<
    IResult<IUserContestListAnalysis[]>
  > {
    const url = `${this.BASE_URI}/contest-entries/user`;
    return this.http.get<IResult<IUserContestListAnalysis[]>>(url);
  }
  createContest(item: IContest): Observable<IResult<IContest>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.post<IResult<IContest>>(url, item);
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
