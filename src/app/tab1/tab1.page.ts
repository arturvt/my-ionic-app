import { Component } from '@angular/core';
import { CountryService } from './countries/country.service';
import { Country, CountryResponse } from './countries/country';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private countryService: CountryService) {}

  countries: Country[];

  getCountriesByCurrency(currency: string): void {
    this.countryService.getCountryByCurrency(currency).subscribe((response: CountryResponse) => {
      console.log(response);
      this.countries = response.data;
    });
  }

}
