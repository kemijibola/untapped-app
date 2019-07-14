import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRole, IResult } from 'src/app/interfaces';

@Injectable()
export class UserTypeService {
  private BASE_URI = 'http://127.0.0.1:9000';

  constructor(private http: HttpClient) {}

  getUserTypes(): Observable<IResult<IRole[]>> {
    const url = `${this.BASE_URI}/user-types`;
    return this.http.get<IResult<IRole[]>>(url);
  }
}
