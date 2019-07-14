import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile, IResult } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  private BASE_URI = '';
  constructor(private http: HttpClient) {
    this.BASE_URI = 'http://127.0.0.1:9000';
  }

  updateProfile(data: IProfile): Observable<IResult<IProfile>> {
    const url = `${this.BASE_URI}/profiles`;
    return this.http.post<IResult<IProfile>>(url, data);
  }
}
