import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { CountryDetail } from '../country';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Region } from '../region';
import { RegionComponent } from '../region/region.component';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  countryDetail: CountryDetail;
  imageUrl: string;
  countryName: string;
  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit(): void {
    this.requestCountry();
  }

  async presentModal(region: Region) {
    console.log(region);
    const modal = await this.modalController.create({
      component: RegionComponent,
      componentProps: {
        region
      }
    });
    return await modal.present();
  }

  private requestCountry(): void {
    this.route.paramMap
      .pipe(
        take(1),
        mergeMap((params) => this.countryService.getCountry(params.get('countryId')))
      )
      .subscribe(
        (countryDetail: CountryDetail) => {
          this.countryName = countryDetail.name;
          this.countryDetail = countryDetail;
          this.imageUrl = countryDetail.flag.replace('http://', 'https://');
        },
        (error) => {
          console.error(error);
        }
      );
  }

   async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Optoins',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Details',
        role: 'destructive',
        icon: 'globe-outline',
        handler: () => {
          Browser.open({
            url: 'https://www.wikidata.org/wiki/' + this.countryDetail.wikiId
          });
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
