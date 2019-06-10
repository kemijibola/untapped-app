import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../models';
import { Observable } from 'rxjs';
import { FileModel, PresignFileModel } from '../models/shared/file';

@Injectable()
export class UploadService {
    private BASE_URI = '';
    constructor(private http: HttpClient) {
        this.BASE_URI = 'http://127.0.0.1:9000';
    }

    upload(files: string[]): Observable<Result> {
        const url = `${this.BASE_URI}/uploads`;
        return this.http.post<Result>(url, files);
    }
    getPresignedUrl(data: PresignFileModel): Observable<Result> {
        console.log(data);
        const url = `${this.BASE_URI}/uploads`;
        return this.http.post<Result>(url, data);
    }
    // uploadFiles(data): Observable<true> {
    //     return this.http.put(data.url, data)
    // }
}
