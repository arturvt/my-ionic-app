import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { DetailComponent } from './countries/detail/detail.component';
import { RegionComponent } from './countries/region/region.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CountryMapComponent } from './countries/country-map/country-map.component';
import { GoogleMapComponent } from './views/google-map/google-map.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab1PageRoutingModule, GoogleMapsModule],
  declarations: [Tab1Page, DetailComponent, RegionComponent, CountryMapComponent, GoogleMapComponent],
})
export class Tab1PageModule {}
