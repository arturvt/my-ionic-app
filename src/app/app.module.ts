import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';

import {
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import {
  IonBackButton,
  IonButtons,
  IonicModule,
  IonicRouteStrategy,
} from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { iosTransitionAnimation } from '@ionic/core/dist/collection/utils/transition/ios.transition';

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      navAnimation: iosTransitionAnimation,
    }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [
    IonBackButton,
    IonButtons,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
