import { Injectable } from '@angular/core';
import { Country, CountryDetail, CountryRequest } from './country';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CountryService {
  readonly host: string;
  private cacheCountries: Map<string, CountryDetail> = new Map();
  private allCountries: Country[];

  constructor(private httpclient: HttpClient, private http: HTTP) {
    this.host = environment.geo_api.host;
  }

  getAllCountries(): Observable<Country[]> {
    if (this.allCountries) {
      return of(this.allCountries);
    }
    const urlRequest = `${this.host}/api/country/all`;
    if (environment.production) {
      return from(this.http.get(urlRequest, {}, {})).pipe(
        map((resp: HTTPResponse) => {
          const parsedObj = JSON.parse(resp.data);
          this.allCountries = parsedObj;
          return parsedObj;
        })
      );
    } else {
      return this.httpclient.get<Country[]>(urlRequest).pipe(
        tap((resp: Country[]) => (this.allCountries = resp)));
    }
  }

  getCountries(page: number = 0, sort: string = 'asc'): Observable<CountryRequest> {
    const urlRequest = `${this.host}/api/country?page=${page}&sort=${sort}`;
    if (environment.production) {
      return from(this.http.get(urlRequest, {}, {})).pipe(
        map((resp: HTTPResponse) => {
          return JSON.parse(resp.data);
        })
      );
    } else {
      return this.httpclient.get<CountryRequest>(urlRequest).pipe(tap((resp: CountryRequest) => {
        resp.content.forEach((countryDetail: CountryDetail) => this.cacheCountries[countryDetail.code] = countryDetail);
      }));
    }
  }

  getCountry(countryID: string): Observable<CountryDetail> {
    const urlRequest = `${this.host}/api/country/${countryID}`;
    if (this.cacheCountries[countryID]) {
      return of(this.cacheCountries[countryID]);
    }
    if (environment.production) {
      return from(this.http.get(urlRequest, {}, {})).pipe(
        map((resp: HTTPResponse) => {
          const parsedObj = JSON.parse(resp.data);
          this.cacheCountries[countryID] = parsedObj;
          return parsedObj;
        })
      );
    } else {
      return this.httpclient.get<CountryDetail>(urlRequest).pipe(
        tap((resp: CountryDetail) => (this.cacheCountries[countryID] = resp)));
    }
  }
}
