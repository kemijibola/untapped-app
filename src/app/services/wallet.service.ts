import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IResult } from "src/app/interfaces";
import { environment } from "../../environments/environment";
import { IWallet } from "../interfaces/account/wallet";

@Injectable({ providedIn: "root" })
export class WalletService {
  private BASE_URI = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  createWallet(pin: string): Observable<IResult<IWallet>> {
    const url = `${this.BASE_URI}/wallets`;
    return this.http.post<IResult<IWallet>>(url, {
      pin,
    });
  }
}
