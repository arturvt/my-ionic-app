import { Injectable } from '@angular/core';
import { CountryDetail, CountryRequest } from './country';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CountryService {
  readonly host: string;

  constructor(private httpclient: HttpClient, private http: HTTP) {
    this.host = environment.geo_api.host;
  }

  getCountries(page: number = 0, sort: string = 'asc'): Observable<CountryRequest> {
    if (environment.production) {
      const urlRequest = `${this.host}/api/country?page=${page}&sort=${sort}`;
      return from(this.http.get(urlRequest,  {}, {})).pipe(map((resp: HTTPResponse) => {
        return JSON.parse(resp.data);
      }));
    } else {
      return this.httpclient.get<CountryRequest>(`${this.host}/api/country`, {
        params: { page: `${page}`, sort: sort },
      });
    }
  }


  getCountry(name: string): Observable<CountryDetail> {
    const urlRequest = `${this.host}/api/country/${name}`;
    if (environment.production) {
      return from(this.http.get(urlRequest,  {}, {})).pipe(map((resp: HTTPResponse) => {
        return JSON.parse(resp.data);
      }));
    } else {
      return this.httpclient.get<CountryDetail>(urlRequest);
    }
  }
}
