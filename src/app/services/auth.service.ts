import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
  IResult,
  IAuthData,
  IRegister,
  ILogin,
  IUser,
  IConfirmEmail
} from '../interfaces';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Injectable()
export class AuthService {
  private BASE_URI = '';

  constructor(private http: HttpClient, private localStorage: LocalStorage) {
    this.BASE_URI = 'http://127.0.0.1:8900/v1';
  }

  confirmEmail(req: IConfirmEmail): Observable<IResult<string>> {
    const { email, token, audience } = req;
    const url = `${this.BASE_URI}/account/verify`;
    return this.http.post<IResult<string>>(url, {
      email,
      token,
      audience
    });
  }

  signUp(newUser: IRegister): Observable<IResult<boolean>> {
    const {
      fullName,
      email,
      password,
      roles,
      audience,
      confirmationUrl
    } = newUser;
    const url = `${this.BASE_URI}/account/signup`;
    return this.http.post<IResult<boolean>>(url, {
      fullName,
      email,
      password,
      roles,
      audience,
      confirmationUrl
    });
  }

  signin(loginParams: ILogin): Observable<IResult<IAuthData>> {
    const url = `${this.BASE_URI}/authentication`;
    const { email, password, audience } = loginParams;
    return this.http.post<IResult<IAuthData>>(
      url,
      { email, password, audience },
      { observe: 'body' }
    );
  }

  fetchUserAuthData(key: string): Observable<IAuthData> {
    return this.localStorage.getItem(key);
  }
  removeUserAuthData(key: string): Observable<boolean> {
    return this.localStorage.removeItem(key);
  }

  setItem(key: string, data = {}): void {
    this.localStorage.setItemSubscribe(key, data);
  }
}
