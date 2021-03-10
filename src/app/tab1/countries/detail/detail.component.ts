import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { CountryDetail } from '../country';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, mergeMap, take } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  countryDetail: CountryDetail;
  imageUrl: string;
  private loader: HTMLIonLoadingElement;
  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private loadingController: LoadingController
  ) {}
  ngOnInit(): void {

    this.loadingController
      .create({
        message: 'Please wait...',
      })
      .then((val: HTMLIonLoadingElement) => {
        this.loader = val;
        this.loader.present();
        this.requestCountry();
      });
  }

  private requestCountry(): void {
    this.route.paramMap
      .pipe(
        take(1),
        mergeMap((params) => this.countryService.getCountry(params.get('countryId'))),
        finalize(() => this.loader.dismiss())
      )
      .subscribe(
        (countryDetail: CountryDetail) => {
          this.countryDetail = countryDetail;
          this.imageUrl = countryDetail.flagImageUri.replace('http://', 'https://');
          console.log(countryDetail);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
