import { Component, OnInit } from '@angular/core';
import { CountryService } from './countries/country.service';
import { Country, CountryRequest, Pageable } from './countries/country';
import { take } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  totalElements = 0;
  loading = true;
  private countries: Country[];
  private filteredCountries$ = new BehaviorSubject<Country[]>([]);

  constructor(private countryService: CountryService) {}

  get countryList(): Observable<Country[]> {
    return this.filteredCountries$;
  }

  ngOnInit(): void {
    console.log('init!')
    combineLatest([this.countryService.getAllCountries()])
      .pipe(take(1))
      .subscribe(([all]) => {
        this.loading = false;
        this.countries = all;
        this.totalElements = all.length;
        this.filterCountries();
      });
  }

  clearAction(): void {
    console.log('cancel!');
  }

  onType(event): void {
    const term = event.target.value.toLowerCase();
    this.filterCountries(term);
  }

  private filterCountries(searchTerm?: string): void {
    if (searchTerm) {
      const filtered = this.countries.filter((country: Country) => country.name.toLowerCase().startsWith(searchTerm));
      this.filteredCountries$.next(filtered);
    } else {
      this.filteredCountries$.next(this.countries);
    }
  }
}
