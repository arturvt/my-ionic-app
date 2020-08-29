import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

const URL = 'https://www.swisscom.ch/oce/gp/v1/devices/product/browse?category=mobilePhones_RES&sortBy=popularity&page=1';

@Injectable({providedIn: 'root'})
export class ProductService {


  constructor(private httpclient: HttpClient, private http: HTTP) {}

  getProducts(): void {
    console.log(`GetByHttpClient`);
    this.httpclient.get(URL).subscribe((b) => {
      console.log(b);
    });

    console.log('getByHttp');
    this.http.get(URL, {}, {}).then(data => {
      console.log(data.status);
      console.log(data.headers);
    }).catch((e) => {
      console.error('Error in HTTP');
      console.log(e);
    }).finally(() => {
      console.log('End of GetByHTTP');
    });
  }
}
