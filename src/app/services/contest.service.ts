import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  IResult,
  IContestList,
  IContest,
  IUserContest,
  IContestIssue,
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

  fetchContest(_id: string): Observable<IResult<IContest>> {
    const url = `${this.BASE_URI}/contests/${_id}`;
    return this.http.get<IResult<IContest>>(url);
  }

  fetchUserContests(): Observable<IResult<IUserContest[]>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.get<IResult<IUserContest[]>>(url);
  }

  findContestByTitle(title: string): Observable<IResult<IContest[]>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.get<IResult<IContest[]>>(`${url}?title=${title}`);
  }

  createContest(item: IContest): Observable<IResult<IContest>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.post<IResult<IContest>>(url, item);
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
