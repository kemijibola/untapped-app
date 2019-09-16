import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IResult,
  SignedUrl,
  PresignedUrl,
  CloudUploadParams
} from '../interfaces';
import { Observable } from 'rxjs';
import { IPresignRequest } from '../interfaces';

@Injectable()
export class UploadService {
  private BASE_URI = '';
  constructor(private http: HttpClient) {
    this.BASE_URI = 'http://127.0.0.1:8900/v1';
  }

  s3Upload(data: CloudUploadParams): Observable<IResult<string>> {
    return this.http.put<IResult<string>>(data.url, data.file, {
      headers: {
        'Content-Type': data.file.type
      }
    });
  }
  getPresignedUrl(data: IPresignRequest): Observable<IResult<SignedUrl>> {
    const url = `${this.BASE_URI}/uploads`;
    return this.http.post<IResult<SignedUrl>>(url, data);
  }
  // uploadFiles(data): Observable<true> {
  //     return this.http.put(data.url, data)
  // }
}
