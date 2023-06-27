import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL =
  'https://www.swisscom.ch/oce/gp/v1/devices/product/browse?category=mobilePhones_RES&sortBy=popularity&page=1';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private httpclient: HttpClient) {}

  getProducts(): void {
    console.log(`GetByHttpClient`);
    this.httpclient.get(URL).subscribe((b) => {
      console.log(b);
    });

    console.log('getByHttp');
  }
}
