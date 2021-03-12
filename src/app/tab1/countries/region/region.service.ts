import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HTTP, HTTPResponse } from "@ionic-native/http/ngx";
import { from, Observable } from 'rxjs';
import { RegionFull, RegionRequest } from "../region";
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RegionService {
  readonly host: string;
  constructor(private httpClient: HttpClient, private http: HTTP) {
    this.host = environment.geo_api.host;
  }

  getRegions(countryId: string): Observable<RegionRequest> {
    const urlRequest = `${this.host}/api/region/${countryId}`;
    if (environment.production) {
      return from(this.http.get(urlRequest,  {}, {})).pipe(map((resp: HTTPResponse) => {
        return JSON.parse(resp.data);
      }));
    } else {
      return this.httpClient.get<RegionRequest>(urlRequest);
    }
  }
}