import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  IResult,
  SignedUrl,
  PresignedUrl,
  CloudUploadParams
} from "../interfaces";
import { Observable, of, forkJoin } from "rxjs";
import { IPresignRequest } from "../interfaces";

@Injectable()
export class UploadService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = "http://127.0.0.1:8900/v1";
  }

  s3Upload(data: CloudUploadParams[]): Observable<any> {
    let responses = [];
    data.map(x => {
      responses = [...responses, this.http.put(x.url, x.file)];
    });
    return forkJoin(responses);
  }

  getPresignedUrl(data: IPresignRequest): Observable<IResult<SignedUrl>> {
    const url = `${this.BASE_URI}/uploads`;
    return this.http.post<IResult<SignedUrl>>(url, data);
  }
}
