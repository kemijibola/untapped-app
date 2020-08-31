import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";
import {
  BankResponse,
  CreateAccountResponse,
} from "../interfaces/account/wallet";

@Injectable({ providedIn: "root" })
export class TransactionService {
  private BASE_URI = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  fetchBanks(processor: string): Observable<BankResponse> {
    const url = `${this.BASE_URI}/transactions/banks`;
    return this.http.post<BankResponse>(url, { processor });
  }

  setUpUserAccount(
    processor: string,
    accountNumber: string,
    bankCode: string
  ): Observable<CreateAccountResponse> {
    const url = `${this.BASE_URI}/transactions/bank/resolve`;
    return this.http.post<CreateAccountResponse>(url, {
      processor,
      accountNumber,
      bankCode,
    });
  }
}
