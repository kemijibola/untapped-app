import { TalentPortfolioPreview } from "./../interfaces/user/portfolio";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MediaQueryParams, MediaPreview, IResult } from "../interfaces";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TalentsService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = "http://127.0.0.1:8900/v1";
  }

  fetchTalentsPortfolioPreviewList(
    queryParams: MediaQueryParams
  ): Observable<IResult<TalentPortfolioPreview[]>> {
    const url = `${this.BASE_URI}/media/talent/${queryParams.user}/portfolio?mediaType=${queryParams.type}&uploadType=${queryParams.uploadType}`;
    return this.http.get<IResult<TalentPortfolioPreview[]>>(url);
  }
}
