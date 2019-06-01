import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Result } from '../models';
import { ConfigurationService } from './configuration.service';
@Injectable()
export class AuthService {

    private BASE_URI = '';

    constructor(private http: HttpClient, private config: ConfigurationService) {
        this.BASE_URI = this.config.baseUrl;
    }

    signUp(name: string, email: string, password: string, user_type: string, audience: string): Observable<Result> {
        const url = `${this.BASE_URI}/signup`;
        return this.http.post<Result>(url, { name, email, password, user_type, audience});
    }

    signin(email: string, password): Observable<Result> {
        const url = `${this.BASE_URI}/signin`;
        return this.http.post<Result>(url, { email, password});
    }

    findUserByEmail(prop): Observable<Result> {
        const url = `${this.BASE_URI}/users`;
        return this.http.get<Result>(`${url}/${prop}`);
    }

}
