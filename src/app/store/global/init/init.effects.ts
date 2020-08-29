import { IAppConfigList, IConfig } from "./../../../interfaces";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as InitActions from "./init.actions";
import {
  exhaustMap,
  take,
  withLatestFrom,
  filter,
  catchError,
  mergeMap,
} from "rxjs/operators";
// import { map } from 'rxjs/operator/map';
import { map } from "rxjs/operators";
import { pipe, of } from "rxjs";

@Injectable()
export class InitEffects {


  constructor(private actions$: Actions, private http: HttpClient) {}

