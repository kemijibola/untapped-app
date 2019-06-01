import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile, Result } from '../models';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ProfileService {
    private BASE_URI = '';
    constructor(private http: HttpClient, private config: ConfigurationService) {
        this.BASE_URI = this.config.baseUrl;
    }

    updateProfile(data: IProfile) {
        const url = `${this.BASE_URI}/profiles`;
        return this.http.post<Result>(url, data);
    }
}
