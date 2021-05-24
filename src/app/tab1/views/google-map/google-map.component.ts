import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { CountryDetail } from '../../countries/country';
import { CountryService } from '../../countries/country.service';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  countryDetail$: Observable<CountryDetail>;
  constructor(private route: ActivatedRoute, private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryDetail$ = this.route.paramMap
      .pipe(mergeMap((params) => this.countryService.getCountry(params.get('countryId'))));
  }
}
