import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

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
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { iosTransitionAnimation } from '@ionic/core/dist/collection/utils/transition/ios.transition';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      navAnimation: iosTransitionAnimation,
    }),
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    IonicStorageModule.forRoot({
      name: '__appDB',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
  ],
  providers: [
    IonBackButton,
    IonButtons,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
