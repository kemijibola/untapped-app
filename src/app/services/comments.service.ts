import { IComment, Reply } from "./../interfaces/user/comment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { IResult } from "../interfaces";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";

@Injectable({ providedIn: "root" })
export class CommentsService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = environment.BASE_URL;
  }

  fetchMediaComments(entityId: string): Observable<IResult<IComment[]>> {
    const url = `${this.BASE_URI}/comments/entity/${entityId}`;
    return this.http.get<IResult<IComment[]>>(url);
  }

  postMediaComment(data: IComment): Observable<IResult<IComment>> {
    const url = `${this.BASE_URI}/comments`;
    return this.http.post<IResult<IComment>>(url, {
      entity: data.entity,
      comment: data.comment,
    });
  }

  postCommentReply(
    commentId: string,
    data: Reply
  ): Observable<IResult<IComment>> {
    const url = `${this.BASE_URI}/comments/${commentId}/reply`;
    return this.http.put<IResult<IComment>>(url, data);
  }

  postCommentLike(commentId: string): Observable<IResult<IComment>> {
    const url = `${this.BASE_URI}/comments/${commentId}/like`;
    return this.http.put<IResult<IComment>>(url, {});
  }
  postCommentUnLike(commentId: string): Observable<IResult<IComment>> {
    const url = `${this.BASE_URI}/comments/${commentId}/unLike`;
    return this.http.put<IResult<IComment>>(url, {});
  }
}
