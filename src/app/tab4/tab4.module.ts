import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { registerPlugin } from '@capacitor/core';

import { Tab4PageRoutingModule } from './tab4-routing.module'
import { SysInfo } from './sys-info-plugin/sys-info-plugin';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }]),
    Tab4PageRoutingModule,
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}


const SysInfoPlugin = registerPlugin<SysInfo>('SysInfo', {
  web: () => import('./sys-info-plugin/sys-info-plugin').then(m => new m.SysInfo()),
});

export { SysInfoPlugin };

