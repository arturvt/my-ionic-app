import { Injectable } from '@angular/core';
import { CountryDetail, CountryRequest } from './country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class CountryService {

  readonly host: string;

  constructor(
    private httpclient: HttpClient,
  ) {
    this.host = environment.geo_api.host;
  }

  getCountries(page: number = 0,  sort: string = 'asc'): Observable<CountryRequest> {
    return this.httpclient.get<CountryRequest>(`${this.host}/api/country`, {
      params: {page: `${page}`, sort: sort}
    });
  }

  getCountry(name: string): Observable<CountryDetail> {
    return this.httpclient.get<CountryDetail>(`${this.host}/api/country/${name}`);
  }
}
