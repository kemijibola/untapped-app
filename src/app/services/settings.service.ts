import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IResult, ISettings } from "../interfaces";
import { environment } from "../../environments/environment";
@Injectable({ providedIn: "root" })
export class SettingsService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = "http://127.0.0.1:9000";
  }

  fetchUserSettings(): Observable<IResult<ISettings>> {
    const url = `${this.BASE_URI}/settings`;
    return this.http.get<IResult<ISettings>>(url);
  }

  updateSettings(data: ISettings): Observable<IResult<ISettings>> {
    const url = `${this.BASE_URI}/settings`;
    return this.http.get<IResult<ISettings>>(url);
  }
}
