import { Injectable } from '@angular/core';
import { Country, CountryDetail, CountryRequest } from './country';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { map, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { Toast } from '@capacitor/toast';
import { PlatformService } from 'src/app/services/platform.service';

@Injectable({ providedIn: 'root' })
export class CountryService {
  readonly host: string;
  private cacheCountries: Map<string, CountryDetail> = new Map();
  private allCountries: Country[];

  constructor(
    private httpclient: HttpClient,
    private http: HTTP,
    private storage: StorageService,
    private platformService: PlatformService) {
    this.host = environment.geo_api.host;
  }

  async presentToast(message?: string) {
    await Toast.show({
      text: message? message: 'Your settings have been saved.',
      position: 'top'
    });
  }


  getAllCountries(): Observable<Country[]> {
    const allFromStorageStr = this.storage.get('allCountries');

    if (allFromStorageStr) {
      this.allCountries = JSON.parse(allFromStorageStr);
      this.presentToast('Loaded From storage');
      return of(this.allCountries);
    }

    if (this.allCountries) {
      this.presentToast('Loaded from service cache');
      return of(this.allCountries);
    }

    return this.requestAllCountries().pipe(tap((allCountries: Country[]) => {
      this.presentToast('Loaded from request');
      this.storage.set('allCountries', JSON.stringify(this.allCountries));
    }));
  }

  getCountry(countryID: string): Observable<CountryDetail> {
    const urlRequest = `/api/country/${countryID}.json`;
    if (this.cacheCountries[countryID]) {
      return of(this.cacheCountries[countryID]);
    }
    if (this.platformService.isMobileApp()) {
      return from(this.http.get(`${this.host}${urlRequest}`, {}, {})).pipe(
        map((resp: HTTPResponse) => {
          const parsedObj = JSON.parse(resp.data);
          this.cacheCountries[countryID] = parsedObj;
          return parsedObj;
        })
      );
    } else {
      return this.httpclient.get<CountryDetail>(urlRequest).pipe(tap((resp: CountryDetail) => {
        this.presentToast(`Loaded: ${resp.name} - capital: ${resp.capital}`);
        this.cacheCountries[countryID] = resp;
      }));
    }
  }

  private requestAllCountries(): Observable<Country[]> {
    const urlRequest = `/api/countries.json`;
    console.log('request:', urlRequest);
    if (this.platformService.isMobileApp()) {
      return from(this.http.get(`${this.host}${urlRequest}`, {}, {})).pipe(
        map((resp: HTTPResponse) => {
          const parsedObj = JSON.parse(resp.data);
          this.allCountries = parsedObj;
          return parsedObj;
        })
      );
    } else {
      return this.httpclient.get<Country[]>(urlRequest).pipe(tap((resp: Country[]) => (this.allCountries = resp)));
    }
  }
}
