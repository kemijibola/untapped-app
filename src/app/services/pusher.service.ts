import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { ContestVoteResult, IResult } from "../interfaces";
import Pusher from "pusher-js";

@Injectable({
  providedIn: "root",
})
export class PusherService {
  pusher: any;
  channel: any;
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = environment.BASE_URL;

    this.pusher = new Pusher(environment.PUSHER_KEY, {
      cluster: environment.PUSHER_CLUSTER,
      forceTLS: true,
    });
    this.channel = this.pusher.subscribe(environment.PUSHER_CHANNEL);
  }

  fetchContestResult(
    contestId: string
  ): Observable<IResult<ContestVoteResult>> {
    const url = `${this.BASE_URI}/votes/contest/${contestId}/result`;
    return this.http.get<IResult<ContestVoteResult>>(url);
  }
}
