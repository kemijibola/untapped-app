import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  IResult,
  SignedUrl,
  PresignedUrl,
  CloudUploadParams,
} from "../interfaces";
import { Observable, of, forkJoin } from "rxjs";
import { IPresignRequest } from "../interfaces";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class UploadService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = environment.BASE_URL;
  }

  s3Upload(data: CloudUploadParams[]): Observable<any> {
    console.log(data[0].file);
    let requests = [];

    data.map((x) => {
      requests = [...requests, this.http.put(x.url, x.file)];
    });
    return forkJoin(requests);
  }

  getPresignedUrl(data: IPresignRequest): Observable<IResult<SignedUrl>> {
    const url = `${this.BASE_URI}/uploads`;
    return this.http.post<IResult<SignedUrl>>(url, data);
  }

  getThumbnailUrl(encodedImage: string): Observable<IResult<SignedUrl>> {
    const url = `${this.BASE_URI}/uploads/thumbnail`;
    return this.http.post<IResult<SignedUrl>>(url, {
      encodedImage: encodedImage,
    });
  }
}
