import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile, Result } from '../models';

@Injectable()
export class ProfileService {
    private BASE_URI = '';
    constructor(private http: HttpClient) {
        this.BASE_URI = 'http://127.0.0.1:9000';
    }

    updateProfile(data: IProfile) {
        const url = `${this.BASE_URI}/profiles`;
        return this.http.post<Result>(url, data);
    }
}
