import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IResult,
  IContestList,
  IContest,
  IUserContest,
  IContestIssue
} from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class ContestService {
  private BASE_URI = '';
  constructor(private http: HttpClient) {
    this.BASE_URI = 'http://127.0.0.1:9000';
  }
  fetchContests(): Observable<IResult<IContestList[]>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.get<IResult<IContestList[]>>(url);
  }
  fetchContest(_id: string): Observable<IResult<IContest>> {
    const url = `${this.BASE_URI}/contests/${_id}`;
    return this.http.get<IResult<IContest>>(url);
  }
  fetchUserContests(_id: string): Observable<IResult<IUserContest[]>> {
    const url = `${this.BASE_URI}/contests?user=${_id}`;
    return this.http.get<IResult<IUserContest[]>>(url);
  }
  createContest(item: IContest): Observable<IResult<IContest>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.post<IResult<IContest>>(url, item);
  }
  createContestIssue(item: IContestIssue): Observable<IResult<IContestIssue>> {
    const url = `${this.BASE_URI}/contests`;
    return this.http.post<IResult<IContestIssue>>(url, item);
  }
}
