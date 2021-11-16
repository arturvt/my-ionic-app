import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

const myIds: string[] = [];

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  // https://ionicframework.com/docs/angular/platform
  constructor(private platform: Platform) {}

  // Is the mobile app as capacitor or cordova are available
  isMobileApp(): boolean {
    return this.platform.is('hybrid');
  }

  // This is the case
  isWebAppMobileView(): boolean {
    return this.platform.is('android') || this.platform.is('ios');
  }

  isAndroid(): boolean {
    return this.platform.is('android');
  }

  isIOS(): boolean {
    return this.platform.is('ios');
  }

  isIphone(): boolean {
    return this.platform.is('iphone');
  }

  isIpad(): boolean {
    return this.platform.is('ipad');
  }

  isTabled(): boolean {
    return this.platform.is('tablet');
  }

  // When running from MobileApp context, it might say it's desktop as well.
  // This method returns if it's ONLY desktop mode, from computer's browser.
  isDesktop(): boolean {
    return this.platform.is('desktop') && !this.isMobileApp();
  }

  isPortrait(): boolean {
    return this.platform.isPortrait();
  }

  isLandScape(): boolean {
    return this.platform.isLandscape();
  }

  debugPlatforms(): string {
    return this.platform.platforms().join(',');
  }

}