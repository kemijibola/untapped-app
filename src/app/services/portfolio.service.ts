import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PortfolioQueryParams,
  IResult,
  IMedia,
  IGeneralMedia
} from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class PortfolioService {
  private BASE_URI = '';
  constructor(private http: HttpClient) {
    this.BASE_URI = 'http://127.0.0.1:8900/v1';
  }

  fetchUserPortfolioMedias(
    queryParams: PortfolioQueryParams
  ): Observable<IResult<IMedia[]>> {
    const url = `${this.BASE_URI}/media?user=${queryParams.user}&type=${queryParams.type}&upload=${queryParams.upload}`;
    return this.http.get<IResult<IMedia[]>>(url);
  }

  fetchUserPortfolioItems(
    queryParams: PortfolioQueryParams
  ): Observable<IResult<IGeneralMedia[]>> {
    const url = `${this.BASE_URI}/media?user=${queryParams.user}&type=${queryParams.type}&upload=${queryParams.upload}`;
    return this.http.get<IResult<IGeneralMedia[]>>(url);
  }

  fetchUserPortfolioMedia(_id: string): Observable<IResult<IMedia>> {
    const url = `${this.BASE_URI}/media/${_id}`;
    return this.http.get<IResult<IMedia>>(url);
  }

  fetchUserPortfolioItem(_id: string): Observable<IResult<IGeneralMedia>> {
    const url = `${this.BASE_URI}/media/${_id}`;
    return this.http.get<IResult<IGeneralMedia>>(url);
  }
}
