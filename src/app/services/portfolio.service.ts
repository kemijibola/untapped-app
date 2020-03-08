import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  PortfolioQueryParams,
  IResult,
  IMedia,
  IGeneralMedia,
  UploadedItems,
  MediaUploadType,
  MediaQueryParams,
  MediaPreview
} from "../interfaces";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class PortfolioService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = "http://127.0.0.1:8900/v1";
  }

  createPortfolioMedia(
    mediaUploadType: MediaUploadType,
    data: UploadedItems
  ): Observable<IResult<IMedia>> {
    const url = `${this.BASE_URI}/media`;
    return this.http.post<IResult<IMedia>>(url, {
      title: data.title,
      items: data.items,
      uploadType: mediaUploadType,
      mediaType: data.type,
      shortDescription: data.shortDescription
    });
  }

  updatePortfolioMedia(
    mediaUploadType: MediaUploadType,
    data: UploadedItems
  ): Observable<IResult<IMedia>> {
    const url = `${this.BASE_URI}/media/${data._id}`;

    return this.http.put<IResult<IMedia>>(url, {
      title: data.title,
      items: data.items,
      uploadType: mediaUploadType,
      mediaType: data.type,
      shortDescription: data.shortDescription
    });
  }

  fetchUserPortfolioList(
    queryParams: MediaQueryParams
  ): Observable<IResult<IMedia[]>> {
    const url = `${this.BASE_URI}/media/me?mediaType=${queryParams.type}&uploadType=${queryParams.uploadType}`;
    return this.http.get<IResult<IMedia[]>>(url);
  }

  fetchUserPortfolioPreviewList(
    queryParams: MediaQueryParams
  ): Observable<IResult<MediaPreview[]>> {
    const url = `${this.BASE_URI}/media/me/preview?mediaType=${queryParams.type}&uploadType=${queryParams.uploadType}`;
    return this.http.get<IResult<MediaPreview[]>>(url);
  }

  fetchPortfolioList(
    queryParams: MediaQueryParams
  ): Observable<IResult<IMedia[]>> {
    const url = `${this.BASE_URI}/media?type=${queryParams.type}&upload_type=${queryParams.uploadType}`;
    return this.http.get<IResult<IMedia[]>>(url);
  }

  fetchPortfolioMedia(
    queryParams: MediaQueryParams
  ): Observable<IResult<IMedia>> {
    const url = `${this.BASE_URI}/media/${queryParams.id}`;
    return this.http.get<IResult<IMedia>>(url);
  }

  deleteMedia(mediaId: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/media/${mediaId}`;
    return this.http.delete<IResult<boolean>>(url);
  }

  deleteMediaItem(
    mediaId: string,
    itemId: string
  ): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/media/${mediaId}/item/${itemId}`;
    return this.http.delete<IResult<boolean>>(url);
  }
}
