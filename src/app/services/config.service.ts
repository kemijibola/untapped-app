import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResult, IAppConfig } from 'src/app/interfaces';
import { AUDIENCE } from '../lib/constants';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ConfigService {
  private BASE_URI = 'http://127.0.0.1:8900';
  configurations: IAppConfig;
  constructor(private http: HttpClient) {}

  getConfigs(): Promise<any> {
    const url = `${this.BASE_URI}/applications`;
    return new Promise((resolve, reject) => {
      this.http.get(`${url}/?audience=${AUDIENCE}`).pipe(
        tap((resp: IResult<IAppConfig>) => {
          if (resp.error) {
            console.log(`initializeApp failed when all is not well`);
            reject(resp.error);
          }
          console.log(`initializeApp called when all is well`);
          resolve();
        })
      );
    });
  }
}
