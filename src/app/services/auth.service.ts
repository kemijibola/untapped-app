import { RouterModule } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  IResult,
  IAuthData,
  IRegister,
  ILogin,
  IUser,
  IConfirmEmail
} from "../interfaces";
import { LocalStorage } from "@ngx-pwa/local-storage";
import { environment } from "../../environments/environment";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private BASE_URI = "";

  constructor(private http: HttpClient) {
    this.BASE_URI = "http://127.0.0.1:8900/v1";
  }

  confirmEmail(req: IConfirmEmail): Observable<IResult<string>> {
    const { email, token } = req;
    const url = `${this.BASE_URI}/account/verify`;
    return this.http.post<IResult<string>>(url, {
      email,
      token
    });
  }

  signUp(newUser: IRegister): Observable<IResult<boolean>> {
    const { fullName, email, password, roles } = newUser;
    const url = `${this.BASE_URI}/account/signup`;
    return this.http.post<IResult<boolean>>(url, {
      fullName,
      email,
      password,
      roles
    });
  }

  signin(loginParams: ILogin): Observable<IResult<IAuthData>> {
    const url = `${this.BASE_URI}/authentication`;
    const { email, password } = loginParams;
    return this.http.post<IResult<IAuthData>>(
      url,
      { email, password },
      { observe: "body" }
    );
  }

  fetchUserData(key: string): Observable<any> {
    return of(JSON.parse(localStorage.getItem(key)));
  }

  removeItem(key: string): Observable<boolean> {
    localStorage.removeItem(key);
    return of(true);
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  updateData(key: string, data: any): void {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(data));
  }
}
