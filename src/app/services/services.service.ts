import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IService, IResult } from "src/app/interfaces";
import { ServiceTypes } from "../lib/constants";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class ServicesService {
  private BASE_URI = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getServices(): Observable<IResult<IService[]>> {
    const url = `${this.BASE_URI}/services`;
    return this.http.get<IResult<IService[]>>(url);
  }
}
