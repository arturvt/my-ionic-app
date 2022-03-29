import { Component, OnInit } from '@angular/core';
import { ProductService } from './products/products.service';
import { Browser } from '@capacitor/browser';
import { LocalNotifications } from '@capacitor/local-notifications';
import { SplashScreen } from '@capacitor/splash-screen';
import { Share } from '@capacitor/share';
import { Dialog } from '@capacitor/dialog';
import { Platform } from '@ionic/angular';
import { Toast } from '@capacitor/toast';
import { PlatformService } from '../services/platform.service';

interface Links {
  name: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  notificationTime = 5;
  pushContent: string;
  readonly linksList: Links[] = [
    {
      name: 'Apple website',
      description: 'Apple',
      url: 'https://www.apple.com',
    },
    {
      name: 'Swisscom Website',
      description: 'Residential webpage',
      url: 'https://www.swisscom.ch',
    },
    {
      name: 'Smartphones',
      description: 'Swisscom shop',
      url: 'https://www.swisscom.ch/en/residential/products/smartphones.html',
    },
    {
      name: 'Smartwatches',
      description: 'Swisscom shop',
      url: 'https://www.swisscom.ch/en/residential/products/smartwatches.html',
    },

    {
      name: 'Bundle configurator',
      description: 'Your Products',
      url: 'https://www.swisscom.ch/bundle-configurator/?app=my-swisscom-app',
    },
    {
      name: 'Bundle configurator (no optimization)',
      description: 'Your products',
      url: 'https://www.swisscom.ch/bundle-configurator/?app=my-swisscom-app',
    },
    {
      name: 'Status page',
      description: 'Overview inOne home page',
      url: 'https://www.swisscom.ch/en/residential/help/network-and-service-status.html',
    },
  ];

  constructor(
    private productService: ProductService,
    public platform: PlatformService,
  ) {}

  ngOnInit(): void {
    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (event) => {
        console.log('GOT local notification event.');
        console.log(event);
      },
    );
  }

  get orientation(): string {
    return this.platform.isLandScape() ? 'inLandscape' : 'inPortrait';
  }

  triggerCall(): void {
    console.log(`Call`);
    this.productService.getProducts();
  }

  async openPDF() {
    await Browser.open({
      url: 'http://www.africau.edu/images/default/sample.pdf',
    });
  }

  async sendMessage() {
    console.log(
      `Scheduling notification for ${this.notificationTime}`,
    );
    console.log(`content: ${this.pushContent}`);
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Hello Push!',
          body: this.pushContent,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null,
        },
      ],
    });
    console.log('scheduled notifications', notifs);
  }

  async shareContent() {
    const shareRet = await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }

  async triggerSplashScreen() {
    console.log('triggering splash');
    SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }

  async openBrowserUrl(url: string, fullScreen: boolean = false) {
    await Browser.open({
      url,
      windowName: 'Swisscom title',
      presentationStyle: fullScreen ? 'popover' : 'fullscreen',
    });
  }

  async alertModal() {
    const alertRet = await Dialog.alert({
      title: 'Stop',
      message: 'this is an error',
    });
  }

  async questionModal() {
    const promptRet = await Dialog.prompt({
      title: 'Hello',
      message: "What's your name?",
    });
    console.log('Prompt ret', promptRet);
  }

  async presentToast(message?: string) {
    await Toast.show({
      text: message ? message : 'Default toast.',
      position: 'top',
    });
  }
}
