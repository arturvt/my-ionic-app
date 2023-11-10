import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { SafeUrlPipePipe } from './pipes/safe-url-pipe.pipe'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [Tab3Page, SafeUrlPipePipe]
})
export class Tab3PageModule {}
