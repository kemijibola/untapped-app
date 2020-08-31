import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IResult, ICategory } from "../interfaces";
import { environment } from "../../environments/environment.prod";

@Injectable({ providedIn: "root" })
export class CategoryService {
  private BASE_URI = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<IResult<ICategory[]>> {
    const url = `${this.BASE_URI}/categories`;
    return this.http.get<IResult<ICategory[]>>(url);
  }
}
