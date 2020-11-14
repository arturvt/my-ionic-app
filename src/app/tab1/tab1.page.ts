import { Component, OnInit } from '@angular/core';
import { CountryService } from './countries/country.service';
import { Country } from './countries/country';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private countryService: CountryService) {}
  countries: Country[];

  ngOnInit(): void {
    this.countries = this.countryService.getCountries();
  }
}
