import {Component, Input, OnInit} from '@angular/core';
import {MapService} from './map.service';
import {CountryLocation} from '../country';


@Component({
    selector: 'app-country-map',
    templateUrl: './country-map.component.html',
    styleUrls: ['./country-map.component.scss'],
})
export class CountryMapComponent implements OnInit {

    @Input() countryLocation: CountryLocation;
    mapLatLongLocation: google.maps.LatLngLiteral;
    constructor(private mapService: MapService) {}
    apiLoaded: boolean;

    zoom = 6;

    private buildMapOptions(): google.maps.LatLngLiteral {
        return {
            lat: +this.countryLocation.lon,
            lng: +this.countryLocation.lat
        };
    }

    ngOnInit(): void {
      console.log('started');
      this.mapLatLongLocation = this.buildMapOptions();
      this.apiLoaded = this.mapService.apiLoaded;
      console.log(this.countryLocation);
    }

}
