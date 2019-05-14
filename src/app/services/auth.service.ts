import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/account/user';

@Injectable()
export class AuthService {
    private BASE_URI = 'http://127.0.0.1:9000';
    constructor(private http: HttpClient) {}
    signUp(name: string, email: string, password: string): Observable<User> {
        const url = `${this.BASE_URI}/signup`;
        return this.http.post<User>(url, { name, email, password});
    }
}
