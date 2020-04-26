import { map, concatMap, catchError } from "rxjs/operators";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { ServicesService } from "src/app/services/services.service";
import * as ServiceActions from "./service.actions";
import { IResult, IService, AppNotificationKey } from "src/app/interfaces";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import { of } from "rxjs";

@Injectable()
export class ServiceEffects {
  fetchServices = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.FETCH_SERVICES),
      concatMap(() =>
        this.servicesService.getServices().pipe(
          map(
            (resp: IResult<IService[]>) =>
              new ServiceActions.FetchServiceSuccess({ services: resp.data })
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private servicesService: ServicesService
  ) {}
}
