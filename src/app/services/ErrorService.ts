import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  getClientErrorMessage(error: Error): string {
    return error.message ? error.message : error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    if (error.error.response_message) {
      return navigator.onLine
        ? error.error.response_message
        : "No Internet Connection";
    }
    return "We’re sorry, but there was a problem displaying this page. Please reload and try again";
  }
}
