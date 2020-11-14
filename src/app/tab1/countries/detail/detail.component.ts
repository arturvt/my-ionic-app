import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { CountryDetail, CountryDetailResponse } from '../country';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  countryDetail: CountryDetail;
  private loader: HTMLIonLoadingElement;
  constructor(private route: ActivatedRoute, private countryService: CountryService, private loadingController: LoadingController) { }
  ngOnInit() {
    this.loadingController.create({
      message: 'Please wait...'
    }).then((val: HTMLIonLoadingElement) => {
      this.loader = val;
      this.loader.present();
    });



    this.route.paramMap.pipe(
      mergeMap(params => this.countryService.getCountry(params.get('countryId'))),
      map((response: CountryDetailResponse) => response.data)).subscribe((countryDetail: CountryDetail) => {
      this.countryDetail = countryDetail;
      this.loader.dismiss();
    });
  }

}
