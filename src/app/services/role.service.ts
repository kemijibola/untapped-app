import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRole, IResult } from 'src/app/interfaces';

@Injectable()
export class RoleService {
  private BASE_URI = 'http://127.0.0.1:8900';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<IResult<IRole[]>> {
    const url = `${this.BASE_URI}/roles`;
    return this.http.get<IResult<IRole[]>>(url);
  }
}
