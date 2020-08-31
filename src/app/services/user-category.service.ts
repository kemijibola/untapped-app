import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  UserFilterCategory,
  IResult,
  ReportType,
  UserFilterRequest,
} from "../interfaces";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class UserCategoryService {
  private BASE_URI = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  getUserFilterCategoryByReportType(
    params: UserFilterRequest
  ): Observable<IResult<UserFilterCategory[]>> {
    const url = `${this.BASE_URI}/user-categories`;
    return this.http.post<IResult<UserFilterCategory[]>>(url, {
      reportType: params.type || "",
      searchText: params.searchText || "",
      userTypeId: params.userTypeId || "",
      categoryId: params.categoryId || "",
    });
  }
}
