import { Injectable, Injector, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "../services/notification.service";
import { LoggingService } from "../services/LoggingService";
import { ErrorService } from "../services/ErrorService";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../account/store/auth.reducers";
import { AuthService } from "../services/auth.service";
import * as AuthActions from "../account/store/auth.actions";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private store: Store<fromApp.AppState>
  ) {}
  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    let message;
    // let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      // stackTrace = errorService.getServerErrorStackTrace(error);
      notifier.showError(message);
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      notifier.showError(message);
    }
    // Always log errors
    logger.logError(message, "stackTrace");
    // console.error(error);
  }
}
