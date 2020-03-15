import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IResult, ICategory } from "../interfaces";

@Injectable()
export class CategoryService {
  private BASE_URI = "http://127.0.0.1:8900/v1";
  constructor(private http: HttpClient) {}

  getCategories(): Observable<IResult<ICategory[]>> {
    const url = `${this.BASE_URI}/categories`;
    return this.http.get<IResult<ICategory[]>>(url);
  }
}
