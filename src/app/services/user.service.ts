import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResult, IUser } from "../interfaces";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";
import { ImageEditRequest } from "../interfaces/media/image";
import { UserAccount } from "../interfaces/account/wallet";

@Injectable({ providedIn: "root" })
export class UserService {
  private BASE_URI = "";

  constructor(private http: HttpClient) {
    this.BASE_URI = environment.BASE_URL;
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

  patchUser(data: IUser): Observable<IResult<IUser>> {
    const url = `${this.BASE_URI}/users/`;
    return this.http.patch<IResult<IUser>>(url, data);
  }

  suspendUserAccount(): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/users/suspend`;
    return this.http.post<IResult<boolean>>(url, {});
  }

  updateUserProfileImage(imagePath: string): Observable<IResult<IUser>> {
    const url = `${this.BASE_URI}/users/`;
    return this.http.patch<IResult<IUser>>(url, {
      profileImagePath: imagePath,
    });
  }

  updateUserProfileStatus(userId: string): Observable<IResult<boolean>> {
    const url = `${this.BASE_URI}/users/admin/approve`;
    return this.http.patch<IResult<boolean>>(url, {
      userId: userId,
    });
  }

  updateUserBannerImage(imagePath: string): Observable<IResult<IUser>> {
    const url = `${this.BASE_URI}/users/`;
    return this.http.patch<IResult<IUser>>(url, {
      bannerImagePath: imagePath,
    });
  }

  fetchUserAccountDetails(): Observable<IResult<UserAccount>> {
    const url = `${this.BASE_URI}/users`;
    return this.http.get<IResult<UserAccount>>(`${url}/user-account`);
  }
}
