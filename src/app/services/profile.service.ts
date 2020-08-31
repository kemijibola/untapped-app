import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IProfile, IResult, TalentProfile } from "../interfaces";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";

@Injectable({ providedIn: "root" })
export class ProfileService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = environment.BASE_URL;
  }

  fetchUserProfile(): Observable<IResult<IProfile>> {
    const url = `${this.BASE_URI}/profiles/user`;
    return this.http.get<IResult<IProfile>>(url);
  }

  fetchUserPendingApproval(): Observable<IResult<TalentProfile[]>> {
    const url = `${this.BASE_URI}/profiles/admin/talents/pending`;
    return this.http.get<IResult<TalentProfile[]>>(url);
  }

  createProfile(data: IProfile): Observable<IResult<IProfile>> {
    const url = `${this.BASE_URI}/profiles`;
    return this.http.post<IResult<IProfile>>(url, data);
  }

  updateProfile(data: IProfile): Observable<IResult<IProfile>> {
    const url = `${this.BASE_URI}/profiles/${data._id}`;
    return this.http.put<IResult<IProfile>>(url, data);
  }

  likeTalent(userId: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/profiles/talent/like`;
    return this.http.post<IResult<boolean>>(url, {
      userId,
    });
  }

  unLikeTalent(userId: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/profiles/talent/unLike`;
    return this.http.post<IResult<boolean>>(url, {
      userId,
    });
  }
}
