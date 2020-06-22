import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserFilterCategory, IResult, ReportType } from "../interfaces";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class UserCategoryService {
  private BASE_URI = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  getUserFilterCategoryByReportType(
    type: ReportType
  ): Observable<IResult<UserFilterCategory[]>> {
    const url = `${this.BASE_URI}/user-categories?reportType=${type}`;
    return this.http.get<IResult<UserFilterCategory[]>>(url);
  }
}
