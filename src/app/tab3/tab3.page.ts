import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCaTJHgKwgsKo5komk5c_eGUdYryL6NADk', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  ngOnInit(): void {
    this.initLocation();
  }

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
    console.log(event.latLng.toJSON())
  }


  async initLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates) {
      coordinates.coords.latitude
      console.log('Current position:', coordinates);

      this.center  = {
        lat: coordinates.coords.latitude, lng: coordinates.coords.longitude
      };
      this.zoom = 10;


    } else {
      console.log('No location allowed')
    }

  };

}
