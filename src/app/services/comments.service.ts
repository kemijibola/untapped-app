import { IComment, Reply } from "./../interfaces/user/comment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { IResult } from "../interfaces";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class CommentsService {
  private BASE_URI = "";
  constructor(private http: HttpClient) {
    this.BASE_URI = "http://127.0.0.1:8900/v1";
  }

  fetchMediaComments(entityId: string): Observable<IResult<IComment[]>> {
    console.log(entityId);
    const url = `${this.BASE_URI}/comments/entity/${entityId}`;
    return this.http.get<IResult<IComment[]>>(url);
  }

  postMediaComment(data: IComment): Observable<IResult<IComment>> {
    console.log("calling service to add comment");
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
