import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResult, IUser } from "../interfaces";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ImageEditRequest } from "../interfaces/media/image";

@Injectable({ providedIn: "root" })
export class UserService {
  private BASE_URI = "";

  constructor(private http: HttpClient) {
    this.BASE_URI = "http://127.0.0.1:8900/v1";
  }

  findUserById(id: string): Observable<IResult<IUser>> {
    const url = `${this.BASE_URI}/users`;
    return this.http.get<IResult<IUser>>(`${url}/${id}`);
  }

  findUserByEmail(email: string): Observable<IResult<IUser[]>> {
    const url = `${this.BASE_URI}/users`;
    return this.http.get<IResult<IUser[]>>(`${url}?email=${email}`);
  }

  updateUser(item: IUser): Observable<IResult<IUser>> {
    const url = `${this.BASE_URI}/users`;
    return this.http.put<IResult<IUser>>(url, item);
  }

  fetchUserProfile(
    key: string,
    params: ImageEditRequest
  ): Observable<IResult<string>> {
    const url = `${this.BASE_URI}/users/profile/picture`;
    return this.http.post<IResult<string>>(url, { key, editParams: params });
  }

  updateUserProfileImage(imagePath: string): Observable<IResult<IUser>> {
    const url = `${this.BASE_URI}/users/`;
    return this.http.patch<IResult<IUser>>(url, {
      profileImagePath: imagePath,
    });
  }

  updateUserBannerImage(imagePath: string): Observable<IResult<IUser>> {
    const url = `${this.BASE_URI}/users/`;
    return this.http.patch<IResult<IUser>>(url, {
      bannerImagePath: imagePath,
    });
  }
}
