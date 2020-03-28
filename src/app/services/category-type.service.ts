import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CategoryType, IResult } from "src/app/interfaces";
import { environment } from "../../environments/environment";

@Injectable()
export class CategoryTypeService {
  private BASE_URI = "http://127.0.0.1:8900/v1";

  constructor(private http: HttpClient) {}

  getCategoryTypes(): Observable<IResult<CategoryType[]>> {
    const url = `${this.BASE_URI}/categories-types`;
    return this.http.get<IResult<CategoryType[]>>(url);
  }
}
