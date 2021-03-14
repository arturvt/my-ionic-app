import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { CountryDetail } from '../country';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, mergeMap, take } from 'rxjs/operators';
import { LoadingController, ModalController } from '@ionic/angular';
import { RegionService } from '../region/region.service';
import { Region, RegionFull, RegionRequest } from '../region';
import { RegionComponent } from '../region/region.component';

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
    private loadingController: LoadingController,
    public modalController: ModalController
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

  async presentModal(region: Region) {
    console.log(region);



    const modal = await this.modalController.create({
      component: RegionComponent,
      componentProps: {
        region: region
      }
    });
    return await modal.present();
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
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
