import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Event as NavigationEvent } from "@angular/router";
import { NavigationStart } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();

    this.router.events.pipe(
      filter(
        ( event: NavigationEvent ) => {
          return( event instanceof NavigationStart );
        })).subscribe((event: NavigationStart) => {
          console.group('Navigatino Start Event');
          console.log("navigation id:", event.id);
          console.log("route:", event.url);
          console.log( "trigger:", event.navigationTrigger );
          if (event.navigationTrigger === 'popstate') {
            console.log('User back history. Preventing');
            window.history.forward();

          }
          if (event.restoredState) {
            console.warn("Restoring navigation id: "  + event.restoredState.navigationId);
          }
          console.groupEnd();
        });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
