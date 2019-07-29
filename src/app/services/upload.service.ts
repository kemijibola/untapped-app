import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResult } from '../interfaces';
import { Observable } from 'rxjs';
import { IFileModel, IPresignFileModel } from '../interfaces';

@Injectable()
export class UploadService {
  private BASE_URI = '';
  constructor(private http: HttpClient) {
    this.BASE_URI = 'http://127.0.0.1:9000';
  }

  upload(files: string[]): Observable<IResult<string[]>> {
    const url = `${this.BASE_URI}/uploads`;
    return this.http.post<IResult<string[]>>(url, files);
  }
  getPresignedUrl(
    data: IPresignFileModel
  ): Observable<IResult<IPresignFileModel>> {
    console.log(data);
    const url = `${this.BASE_URI}/uploads`;
    return this.http.post<IResult<IPresignFileModel>>(url, data);
  }
  // uploadFiles(data): Observable<true> {
  //     return this.http.put(data.url, data)
  // }
}
