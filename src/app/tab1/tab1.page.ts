import { Component, OnInit } from '@angular/core';
import { CountryService } from './countries/country.service';
import { CountryRequest } from './countries/country';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private countryService: CountryService) {}
  countryRequest: CountryRequest;

  ngOnInit(): void {
    this.countryService.getCountries()
    .subscribe((countryRequest: CountryRequest) => this.countryRequest = countryRequest);
  }
}
