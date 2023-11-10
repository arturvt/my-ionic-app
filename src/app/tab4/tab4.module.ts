import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  HttpClientModule,
  HttpClientJsonpModule,
} from '@angular/common/http';

import { Tab4PageRoutingModule } from './tab4-routing.module';
import { ModalSampleComponent } from './components/modal-sample/modal-sample.component';
import { CloseableModalComponent } from './closeable-modal/closeable-modal.component';
import { SdxPageComponent } from './components/sdx-page/sdx-page.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }]),
    Tab4PageRoutingModule,
  ],
  declarations: [Tab4Page, ModalSampleComponent, CloseableModalComponent, SdxPageComponent],
})
export class Tab4PageModule {}
