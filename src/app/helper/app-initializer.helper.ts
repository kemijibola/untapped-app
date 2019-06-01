import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../services/configuration.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, ObservableInput, of } from 'rxjs';

export function load(http: HttpClient, config: ConfigurationService): (() => Promise<boolean>) {
    return (): Promise<boolean> => {
        return new Promise<boolean>((resolve: (a: boolean) => void): void => {
            http.get('../../assets/config.json')
            .pipe(
              map((x: ConfigurationService) => {
                  console.log(x);
                config.baseUrl = x.baseUrl;
                resolve(true);
              }),
              catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
                if (x.status !== 404) {
                  resolve(false);
                }
                config.baseUrl = 'http://127.0.0.1:9000';
                resolve(true);
                return of({});
              })
            ).subscribe();
        });
    };
}
