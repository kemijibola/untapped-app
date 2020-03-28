import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserFilterCategory, IResult, ReportType } from "../interfaces";

@Injectable()
export class UserCategoryService {
  private BASE_URI = "http://127.0.0.1:8900/v1";
  constructor(private http: HttpClient) {}

  getAllTalentsByHighestComment(
    type: ReportType
  ): Observable<IResult<UserFilterCategory[]>> {
    const url = `${this.BASE_URI}/user-categories?reportType=${type}`;
    return this.http.get<IResult<UserFilterCategory[]>>(url);
  }
}
