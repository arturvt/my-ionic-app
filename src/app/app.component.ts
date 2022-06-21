import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    console.log('App component start');
    this.activatedRoute.url.subscribe((urlSegment: UrlSegment[]) => {
      const segments = urlSegment.map(
        (urlSegment: UrlSegment) => urlSegment.path,
      );
      console.log('url!');
      console.log(segments);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      SplashScreen.hide();
    });
  }
}
