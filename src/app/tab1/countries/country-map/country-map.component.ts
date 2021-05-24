import {Component, Input, OnInit} from '@angular/core';
import {CountryLocation} from '../country';

@Component({
    selector: 'app-country-map',
    templateUrl: './country-map.component.html',
    styleUrls: ['./country-map.component.scss'],
})
export class CountryMapComponent implements OnInit {

    @Input() countryLocation: CountryLocation;
    mapLatLongLocation: google.maps.LatLngLiteral;
    constructor() {}
    zoom = 5;

    options: google.maps.MapOptions = {
        // mapTypeId: 'hybrid',
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
        maxZoom: 15,
        minZoom: 1,
      }

    private buildMapLocation(): google.maps.LatLngLiteral {
        return {
            lat: +this.countryLocation.lon,
            lng: +this.countryLocation.lat
        };
    }

    ngOnInit(): void {
      this.mapLatLongLocation = this.buildMapLocation();
    }

}
