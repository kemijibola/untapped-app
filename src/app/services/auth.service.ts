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
  IConfirmEmail,
} from "../interfaces";
import { LocalStorage } from "@ngx-pwa/local-storage";
import { environment } from "../../environments/environment.prod";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private BASE_URI = "";

  constructor(private http: HttpClient) {
    this.BASE_URI = environment.BASE_URL;
  }

  confirmEmail(req: IConfirmEmail): Observable<IResult<string>> {
    const { email, token } = req;
    const url = `${this.BASE_URI}/account/verify`;
    return this.http.post<IResult<string>>(url, {
      email,
      token,
    });
  }

  verifyPasswordReset(req: IConfirmEmail): Observable<IResult<string>> {
    const { email, token } = req;
    const url = `${this.BASE_URI}/account/password/reset/verify`;
    return this.http.post<IResult<string>>(url, {
      email,
      token,
    });
  }

  confirmEmailChange(req: IConfirmEmail): Observable<IResult<string>> {
    const { email, token } = req;
    const url = `${this.BASE_URI}/account/email/change/verify`;
    return this.http.post<IResult<string>>(url, {
      email,
      token,
    });
  }

  signUp(newUser: IRegister): Observable<IResult<boolean>> {
    const { fullName, email, password, userType } = newUser;
    const url = `${this.BASE_URI}/account/signup`;
    return this.http.post<IResult<boolean>>(url, {
      fullName,
      email,
      password,
      userType,
    });
  }

  requestPasswordReset(
    email: string,
    redirectUrl: string
  ): Observable<IResult<string>> {
    const url = `${this.BASE_URI}/account/password/reset/request`;
    return this.http.post<IResult<string>>(url, {
      email,
      redirectUrl,
    });
  }

  createNewPassword(
    email: string,
    newPassword: string
  ): Observable<IResult<string>> {
    const url = `${this.BASE_URI}/account/password/reset`;
    return this.http.post<IResult<string>>(url, {
      email,
      newPassword,
    });
  }

  changeEmailAddress(
    newEmail: string,
    emailChangeVerificationUri: string
  ): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/account/email/change`;
    return this.http.post<IResult<boolean>>(url, {
      newEmailAddress: newEmail,
      redirectUrl: emailChangeVerificationUri,
    });
  }

  resendVerificationLink(email: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/account/resend-link`;
    return this.http.post<IResult<boolean>>(url, {
      email,
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
    this.removeItem(key);
    localStorage.setItem(key, JSON.stringify(data));
  }
}
