import { IContestEntryDetails } from "./../../../interfaces/contests/Contest";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IResult, IMedia, IContest } from "src/app/interfaces";

@Injectable({ providedIn: "root" })
export class AdminApprovalService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = environment.BASE_URL;
  }

  fetchPendingMediaApprovals(): Observable<IResult<IMedia[]>> {
    const url = `${this.BASE_URI}/media/admin/pending`;
    return this.http.get<IResult<IMedia[]>>(url);
  }

  fetchPendingContest(): Observable<IResult<IContest[]>> {
    const url = `${this.BASE_URI}/contests/admin/pending`;
    return this.http.get<IResult<IContest[]>>(url);
  }

  fetchPendingEntries(): Observable<IResult<IContestEntryDetails[]>> {
    const url = `${this.BASE_URI}/contest-entries/admin/pending`;
    return this.http.get<IResult<IContestEntryDetails[]>>(url);
  }

  approveMediaItem(
    mediaId: string,
    mediaItemId: string
  ): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/media/admin/approve/${mediaId}`;
    return this.http.put<IResult<boolean>>(url, { itemId: mediaItemId });
  }

  approveContest(contestId: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/contests/admin/approve/${contestId}`;
    return this.http.put<IResult<boolean>>(url, {});
  }

  approveEntry(entryId: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/contest-entries/admin/approve/${entryId}`;
    return this.http.put<IResult<boolean>>(url, {});
  }

  rejectContest(
    contestId: string,
    reason: string
  ): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/contests/admin/reject/${contestId}`;
    return this.http.put<IResult<boolean>>(url, {
      reason: reason,
    });
  }

  rejectEntry(contestId: string, reason: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/contest-entries/admin/reject/${contestId}`;
    return this.http.put<IResult<boolean>>(url, {
      reason,
    });
  }

  rejectMediaItem(
    mediaId: string,
    mediaItemId: string,
    rejectionReson: string
  ): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/media/admin/reject/${mediaId}`;
    return this.http.put<IResult<boolean>>(url, {
      itemId: mediaItemId,
      reason: rejectionReson,
    });
  }
}
