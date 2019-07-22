import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IResult, IAuthData, IRegister, ILogin, IUser } from '../interfaces';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Injectable()
export class AuthService {
  private BASE_URI = '';

  constructor(private http: HttpClient, private localStorage: LocalStorage) {
    this.BASE_URI = 'http://127.0.0.1:8900/v1';
  }

  signUp(newUser: IRegister): Observable<IResult<IAuthData>> {
    const { name, email, password, roles, audience } = newUser;
    const url = `${this.BASE_URI}/account/signup`;
    return this.http.post<IResult<IAuthData>>(url, {
      name,
      email,
      password,
      roles,
      audience
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

  findUserByEmail(email: string): Observable<IResult<IUser[]>> {
    const url = `${this.BASE_URI}/users`;
    return this.http.get<IResult<IUser[]>>(`${url}?email=${email}`);
  }

  getUserData(): Observable<IAuthData> {
    return this.localStorage.getItem('authData');
  }
}
