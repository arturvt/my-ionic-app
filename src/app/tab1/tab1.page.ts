import {Component, OnInit} from '@angular/core';
import {CountryService} from './countries/country.service';
import {Country, CountryRequest, Pageable} from './countries/country';
import {LoadingController} from '@ionic/angular';
import {finalize, take} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
    totalElements = 0;
    private page: Pageable;
    private pageNumber = 0;
    private loader: HTMLIonLoadingElement;
    private countries: Country[];
    private filteredCountries$ = new BehaviorSubject<Country[]>([]);

    constructor(private countryService: CountryService, private loadingController: LoadingController) {
    }

    get countryList(): Observable<Country[]> {
        return this.filteredCountries$;
    }

    ngOnInit(): void {
        this.loadingController
            .create({
                message: 'Please wait...',
            })
            .then((val: HTMLIonLoadingElement) => {
                this.loader = val;
                this.loader.present();

                combineLatest([
                    this.countryService.getAllCountries(),
                    this.countryService.getCountries()])
                    .pipe(take(1), finalize(() => this.loader.dismiss()))
                    .subscribe(([all, countryRequest]) => {
                        this.countries = all;
                        this.filterCountries();
                        this.fillComponentContent(countryRequest);
                    });
            });
    }

    clearAction(): void {
        console.log('cancel!');
    }

    onType(event): void {
        const term = event.target.value.toLowerCase();
        this.filterCountries(term);

    }

    private fillComponentContent = (countryRequest: CountryRequest) => {
        this.totalElements = countryRequest.totalElements;
        this.pageNumber = countryRequest.pageable.pageNumber;
        this.page = countryRequest.pageable;
        console.log(this.page);
    };

    private filterCountries(searchTerm?: string): void {
        if (searchTerm) {
            const filtered = this.countries.filter((country: Country) => country.name.toLowerCase().startsWith(searchTerm));
            this.filteredCountries$.next(filtered);
        } else {
            this.filteredCountries$.next(this.countries);
        }

    }
}
