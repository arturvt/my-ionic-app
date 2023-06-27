import { Injectable } from '@angular/core';
import { Country, CountryDetail } from './country';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
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
    private storage: StorageService,
    private platformService: PlatformService,
  ) {
    this.host = environment.geo_api.host;
  }

  async presentToast(message?: string) {
    await Toast.show({
      text: message ? message : 'Your settings have been saved.',
      position: 'top',
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
  }

  getCountry(countryID: string): Observable<CountryDetail> {
    const urlRequest = `/api/country/${countryID}.json`;
    if (this.cacheCountries[countryID]) {
      return of(this.cacheCountries[countryID]);
    }
    return this.httpclient.get<CountryDetail>(urlRequest).pipe(
      tap((resp: CountryDetail) => {
        this.presentToast(
          `Loaded: ${resp.name} - capital: ${resp.capital}`,
        );
        this.cacheCountries[countryID] = resp;
      }),
    );
  }
}
