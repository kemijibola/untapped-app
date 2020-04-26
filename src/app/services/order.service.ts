import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResult, IOrder } from "../interfaces";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ImageEditRequest } from "../interfaces/media/image";

@Injectable({ providedIn: "root" })
export class OrderService {
  private BASE_URI = "";

  constructor(private http: HttpClient) {
    this.BASE_URI = "http://127.0.0.1:8900/v1";
  }

  createOrder(newOrder: IOrder): Observable<IResult<IOrder>> {
    const url = `${this.BASE_URI}/orders`;
    return this.http.post<IResult<IOrder>>(url, {
      service: newOrder.service,
      processor: newOrder.processor,
      order: newOrder.order,
    });
  }

  verifyOrder(
    orderId: string,
    reference: string,
    processor: string
  ): Observable<IResult<IOrder>> {
    const url = `${this.BASE_URI}/orders/${orderId}/verify`;
    return this.http.post<IResult<IOrder>>(url, {
      reference,
      processor,
    });
  }
}
