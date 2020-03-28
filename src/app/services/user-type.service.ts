import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUserType, IResult } from "src/app/interfaces";
import { environment } from "../../environments/environment";

@Injectable()
export class UserTypeService {
  private BASE_URI = "http://127.0.0.1:8900/v1";

  constructor(private http: HttpClient) {}

  getUserTypes(): Observable<IResult<IUserType[]>> {
    const url = `${this.BASE_URI}/user-types`;
    return this.http.get<IResult<IUserType[]>>(url);
  }
}
