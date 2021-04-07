import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CountryDetail } from "../country";
import { CountryService } from "../country.service";
import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit, OnDestroy {

  country: CountryDetail;

  private subsciption: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService){}

  ngOnInit(): void {
    Browser.prefetch({
      urls: [
        'https://www.wikidata.org/',
        'https://www.wikidata.org/wiki/Wikidata:Main_Page',
      ]
    }).then(_ => console.log('prefetched'));

    const countryID = this.activatedRoute.snapshot.paramMap.get('countryId');
    this.subsciption = this.countryService.getCountry(countryID)
    .subscribe((country: CountryDetail) => {
      console.log('got');
      console.log(country)
      this.country = country;
    })

  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

  async openRegion(wikiId: string) {
    console.log('opening: ', wikiId)
    await Browser.open({
      url: 'https://www.wikidata.org/wiki/' + wikiId
    });
  }

}