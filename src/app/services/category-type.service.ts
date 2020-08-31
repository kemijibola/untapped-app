import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CategoryType, IResult } from "src/app/interfaces";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class CategoryTypeService {
  private BASE_URI = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getCategoryTypes(): Observable<IResult<CategoryType[]>> {
    const url = `${this.BASE_URI}/categories-types`;
    return this.http.get<IResult<CategoryType[]>>(url);
  }
}
