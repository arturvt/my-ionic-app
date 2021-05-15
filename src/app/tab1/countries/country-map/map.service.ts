import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, take, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MapService {

    apiLoaded = false;

    constructor(private httpClient: HttpClient) {
        this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCaTJHgKwgsKo5komk5c_eGUdYryL6NADk', 'callback')
            .pipe(take(1))
            .subscribe(() => {
                console.log('loaded!');
                this.apiLoaded = true;
            }, (error => {
                console.error(error);
            }));

    }

    isApiLoaded(): Observable<boolean> {
        if (this.apiLoaded === undefined) {
            return this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCaTJHgKwgsKo5komk5c_eGUdYryL6NADk', 'callback')
                .pipe(
                    take(1),
                    map(() => {
                        this.apiLoaded = true;
                        return this.apiLoaded;
                    }, catchError(error => {
                        console.error(error);
                        this.apiLoaded = false;
                        return of(this.apiLoaded);
                    })
                )
            );
        }
        return of(this.apiLoaded);
    }
}
