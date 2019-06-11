import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Result, IAuthData } from '../models';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Injectable()
export class AuthService {

    private BASE_URI = '';

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorage) {
        this.BASE_URI = 'http://127.0.0.1:9000';
    }

    signUp(name: string, email: string, password: string, user_type: string, audience: string): Observable<Result> {
        const url = `${this.BASE_URI}/signup`;
        return this.http.post<Result>(url, { name, email, password, user_type, audience});
    }

    signin(email: string, password: string, audience: string): Observable<Result> {
        const url = `${this.BASE_URI}/authentication`;
        return this.http.post<Result>(url, { email, password, audience}, { observe: 'body'});
    }

    findUserByEmail(prop): Observable<Result> {
        const url = `${this.BASE_URI}/users`;
        return this.http.get<Result>(`${url}/${prop}`);
    }

    getUserData(): Observable<IAuthData> {
        return this.localStorage.getItem('authData');
    }

}
