import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IResult } from "src/app/interfaces";
import { environment } from "../../environments/environment.prod";
import { IWallet, Transaction } from "../interfaces/account/wallet";

@Injectable({ providedIn: "root" })
export class WalletService {
  private BASE_URI = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  fetchUserWalletData(): Observable<IResult<IWallet>> {
    const url = `${this.BASE_URI}/wallets/details`;
    return this.http.get<IResult<IWallet>>(url);
  }

  fetchUserWalletTransactions(): Observable<IResult<Transaction[]>> {
    const url = `${this.BASE_URI}/wallets/transactions`;
    return this.http.get<IResult<Transaction[]>>(url);
  }

  createWallet(pin: string): Observable<IResult<IWallet>> {
    const url = `${this.BASE_URI}/wallets`;
    return this.http.post<IResult<IWallet>>(url, {
      pin,
    });
  }

  transfer(
    processor: string,
    walletPin: string,
    amount: string,
    narration: string
  ): Observable<IResult<IWallet>> {
    const url = `${this.BASE_URI}/wallets/transfer`;
    return this.http.post<IResult<IWallet>>(url, {
      processor,
      walletPin,
      amount,
      narration,
    });
  }
}
