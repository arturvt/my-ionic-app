import { Injectable } from '@angular/core';
import { Country, CountryResponse, CountryDetailResponse } from './country';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { countriesList } from './countries';
import { AngularFirestore } from '@angular/fire/firestore';

const HOST = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries';

@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(
    private httpclient: HttpClient,
    private firestone: AngularFirestore
  ) {}

  readonly headers = new HttpHeaders().set(
    'x-rapidapi-key',
    environment.geo_api.key
  );

  countryDetails(countryID: string): void {
    this.firestone.collection('countries').valueChanges().subscribe((value) => {
      console.log(`got from firebase`);
      console.log(value);
    });
  }

  getCountries(): Country[] {
    return countriesList;
  }

  getCountry(name: string): Observable<CountryDetailResponse> {
    return this.httpclient.get<CountryDetailResponse>(`${HOST}/${name}`, {
      headers: this.headers,
    });
  }

  getCountryByLanguage(languageCode: string): Observable<CountryResponse> {
    const params = new HttpParams()
      .set('languageCode', languageCode)
      .set('limit', '10');
    return this.httpclient.get<CountryResponse>(HOST, {
      params,
      headers: this.headers,
    });
  }

  getCountryByCurrency(currency: string): Observable<CountryResponse> {
    const params = new HttpParams()
      .set('currencyCode', currency)
      .set('limit', '10');
    return this.httpclient.get<CountryResponse>(HOST, {
      params,
      headers: this.headers,
    });
  }
}
