import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IService, IResult } from "src/app/interfaces";
import { ServiceTypes } from "../lib/constants";

@Injectable({ providedIn: "root" })
export class ServicesService {
  private BASE_URI = "http://127.0.0.1:8900/v1";

  constructor(private http: HttpClient) {}

  getServices(): Observable<IResult<IService[]>> {
    const url = `${this.BASE_URI}/services`;
    return this.http.get<IResult<IService[]>>(url);
  }
}
