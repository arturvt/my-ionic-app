import { Injectable } from '@angular/core';
import { Country, CountryDetail, CountryRequest } from './country';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { map, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class CountryService {
  readonly host: string;
  private cacheCountries: Map<string, CountryDetail> = new Map();
  private allCountries: Country[];

  constructor(private httpclient: HttpClient,
    private http: HTTP,
    private storage: StorageService,
    private toastController: ToastController) {
    this.host = environment.geo_api.host;
  }

  async presentToast(message?: string) {
    const toast = await this.toastController.create({
      message: message? message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
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

  getCountries(page: number = 0, sort: string = 'asc'): Observable<CountryRequest> {
    const urlRequest = `${this.host}/api/country?page=${page}&sort=${sort}`;
    if (environment.production) {
      return from(this.http.get(urlRequest, {}, {})).pipe(
        map((resp: HTTPResponse) => {
          return JSON.parse(resp.data);
        })
      );
    } else {
      return this.httpclient.get<CountryRequest>(urlRequest).pipe(
        tap((resp: CountryRequest) => {
          resp.content.forEach((countryDetail: CountryDetail) => (this.cacheCountries[countryDetail.code] = countryDetail));
        })
      );
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
      return this.httpclient.get<CountryDetail>(urlRequest).pipe(tap((resp: CountryDetail) => (this.cacheCountries[countryID] = resp)));
    }
  }

  private requestAllCountries(): Observable<Country[]> {
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
      return this.httpclient.get<Country[]>(urlRequest).pipe(tap((resp: Country[]) => (this.allCountries = resp)));
    }
  }
}
