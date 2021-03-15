import { Component, OnInit } from '@angular/core';
import { ProductService } from './products/products.service';
import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;
const { LocalNotifications } = Plugins;
const { Share } = Plugins;
const { SplashScreen } = Plugins;
const { Modals } = Plugins;


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private productService: ProductService) {}
  notificationTime = 5;
  pushContent: string;
  ngOnInit(): void {
  Browser.prefetch({
    urls: [
      'https://www.swisscom.ch',
      'https://www.swisscom.ch/en/residential.html'
    ]
  }).then(_ => console.log('prefetched'));
  }

  triggerCall(): void {
    console.log(`Call`);
    this.productService.getProducts();
  }

  async openPDF() {
    await Browser.open({
      url: 'http://www.africau.edu/images/default/sample.pdf'
    });
  }

  async sendMessage() {
    console.log(`Scheduling notification for ${this.notificationTime}`);
    console.log(`content: ${this.pushContent}`)
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Hello Push!",
          body: this.pushContent,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
    console.log('scheduled notifications', notifs);
  }

  async openBrowser() {
    await Browser.open({
      url: 'https://www.swisscom.ch'
    });
  }

  async shareContent() {
    let shareRet = await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies'
    });
  }

  async triggerSplashScreen() {
    console.log('triggering splash');
    SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });
  }

  async alertModal() {
    let alertRet = await Modals.alert({
      title: 'Stop',
      message: 'this is an error'
    });
  }

  async questionModal() {
    let promptRet = await Modals.prompt({
      title: 'Hello',
      message: 'What\'s your name?'
    });
    console.log('Prompt ret', promptRet);
  }
}
