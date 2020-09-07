import { Injectable } from '@angular/core';
import {  CountryResponse } from './country';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries?currencyCode=USD';
const HOST = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries';

@Injectable({providedIn: 'root'})
export class CountryService {

  constructor(private httpclient: HttpClient, private http: HTTP) {}

  readonly headers = new HttpHeaders().set('x-rapidapi-key', environment.geo_api.key);

  getCountries(): Observable<CountryResponse> {
    return this.httpclient.get<CountryResponse>(HOST);
  }

  getCountryByLanguage(languageCode: string): Observable<CountryResponse> {
    const params = new HttpParams().set('languageCode', languageCode).set('limit', '10');
    return this.httpclient.get<CountryResponse>(HOST, {params, headers: this.headers});
  }

  getCountryByCurrency(currency: string): Observable<CountryResponse> {
    const params = new HttpParams().set('currencyCode', currency).set('limit', '10');
    return this.httpclient.get<CountryResponse>(HOST, {params, headers: this.headers});
  }
  // getProducts(): void {
  //   console.log(`GetByHttpClient`);
  //   this.httpclient.get(URL).subscribe((b) => {
  //     console.log(b);
  //   });

  //   console.log('getByHttp');
  //   this.http.get(URL, {}, {}).then(data => {
  //     console.log(data.status);
  //     console.log(data.headers);
  //   }).catch((e) => {
  //     console.error('Error in HTTP');
  //     console.log(e);
  //   }).finally(() => {
  //     console.log('End of GetByHTTP');
  //   });
  // }
}
