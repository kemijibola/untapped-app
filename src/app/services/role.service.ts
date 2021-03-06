import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IRole, IResult } from "src/app/interfaces";
import { ConfigService } from "./config.service";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class RoleService {
  private BASE_URI = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<IResult<IRole[]>> {
    const url = `${this.BASE_URI}/roles`;
    return this.http.get<IResult<IRole[]>>(url);
  }
}
