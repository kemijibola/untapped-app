import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResult, IAppConfig } from "src/app/interfaces";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ConfigService {
  private BASE_URI = "http://127.0.0.1:8900";
  configurations: IAppConfig;
  constructor(private http: HttpClient) {}
}
