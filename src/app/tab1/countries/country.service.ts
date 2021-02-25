import { Injectable } from '@angular/core';
import { CountryDetail, CountryRequest } from './country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(
    private httpclient: HttpClient,
    private firestone: AngularFirestore
  ) {}


  countryDetails(countryID: string): void {
    this.firestone.collection('countries').valueChanges().subscribe((value) => {
      console.log(`got from firebase`);
      console.log(value);
    });
  }

  getCountries(sort: string = 'asc'): Observable<CountryRequest> {
    return this.httpclient.get<CountryRequest>(`/api/country`, {
      params: {sort}
    });
  }

  getCountry(name: string): Observable<CountryDetail> {
    console.log('CountryDEtail')
    return this.httpclient.get<CountryDetail>(`/api/country/${name}`);
  }
}
