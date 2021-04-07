import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryService } from './countries/country.service';
import { Country, CountryRequest, Pageable } from './countries/country';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private countryService: CountryService, private loadingController: LoadingController) {}
  private page: Pageable;
  private pageNumber = 0;
  private loader: HTMLIonLoadingElement;
  countries: Country[] = [];
  totalElements = 0;

  ngOnInit(): void {
    this.loadingController
      .create({
        message: 'Please wait...',
      })
      .then((val: HTMLIonLoadingElement) => {
        this.loader = val;
        this.loader.present();
        this.countryService
          .getCountries()
          .pipe(
            take(1),
            finalize(() => this.loader.dismiss())
          )
          .subscribe((countryRequest: CountryRequest) => this.fillComponentContent(countryRequest));
      });
  }


  private fillComponentContent = (countryRequest: CountryRequest) => {
    this.totalElements = countryRequest.totalElements;
    this.pageNumber = countryRequest.pageable.pageNumber;
    this.countries = this.countries.concat(countryRequest.content);
    this.page = countryRequest.pageable;
    console.log(this.page);
  };

  loadData(event) {

    this.countryService
    .getCountries(this.pageNumber + 1)
    .pipe(take(1))
    .subscribe((countryRequest: CountryRequest) => {
      this.fillComponentContent(countryRequest);
      event.target.complete();
      if (this.countries.length == this.totalElements) {
        event.target.disabled = true;
        console.log('Loaded 100%')
      }
    });
  }
}
