import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/account/user';
import * as fromApp from '../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { map, tap, takeUntil, switchMap } from 'rxjs/operators';
import * as fromUserType from '../user-type/store/user-type.reducers';
import { Result } from '../models';
@Injectable()
export class AuthService {
    private BASE_URI = 'http://127.0.0.1:9000';

    constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {}

    signUp(email: string, name: string, password: string, user_type: string, audience: string): Observable<Result> {
        const url = `${this.BASE_URI}/signup`;
        return this.http.post<Result>(url, { name, email, password, user_type, audience});
    }

    findUserByEmail(prop): Observable<Result> {
        const url = `${this.BASE_URI}/users`;
        return this.http.get<Result>(`${url}/${prop}`);
    }

}
