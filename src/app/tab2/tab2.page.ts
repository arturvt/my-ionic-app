import {Component, OnInit} from '@angular/core';
import {ProductService} from './products/products.service';
import {Plugins} from '@capacitor/core';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
const {Browser} = Plugins;
const {LocalNotifications} = Plugins;
const {Share} = Plugins;
const {SplashScreen} = Plugins;
const {Modals} = Plugins;

interface Links {
    name: string;
    url: string;
    description: string;
}

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    notificationTime = 5;
    pushContent: string;
    readonly linksList: Links[] = [{
        name: 'Swisscom Website',
        description: 'Residential webpage',
        url: 'https://www.swisscom.ch',
    }, {
        name: 'Residential Website',
      description: 'Help with your phone',
        url: 'https://www.swisscom.ch/en/residential.html',
    }, {
        name: 'Status page',
        description: 'Overview inOne home page',
        url: 'https://www.swisscom.ch/en/residential/help/network-and-service-status.html',
    }
    ];

    constructor(private productService: ProductService,
                private browserTab: BrowserTab, private inAppBrowser: InAppBrowser) {
    }

    ngOnInit(): void {
      const prefetchtUrls = this.linksList.map((link: Links) => link.url);
      Browser.prefetch({
            urls: prefetchtUrls
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
        console.log(`content: ${this.pushContent}`);
        const notifs = await LocalNotifications.schedule({
            notifications: [
                {
                    title: 'Hello Push!',
                    body: this.pushContent,
                    id: 1,
                    schedule: {at: new Date(Date.now() + 1000 * 5)},
                    sound: null,
                    attachments: null,
                    actionTypeId: '',
                    extra: null
                }
            ]
        });
        console.log('scheduled notifications', notifs);
    }

    async openBrowserUrl(url: string) {
        await Browser.open({
            url, windowName: 'Swisscom title',
        });
    }

    openInAppBrowser(url: string): void {

        const browser = this.inAppBrowser.create(url);

        browser.on('loadstop').subscribe(event => {
            browser.insertCSS({ code: 'body{color: red;' });
        });
    }

    openBrowserNative(url: string): void {
        this.browserTab.isAvailable()
            .then(isAvailable => {
                if (isAvailable) {
                    this.browserTab.openUrl(url);
                } else {
                    // open URL with InAppBrowser instead or SafariViewController
                }
            });
    }


    // async alertModal() {
    //     let alertRet = await Modals.alert({
    //         title: 'Stop',
    //         message: 'this is an error'
    //     });
    // }
    //
    // async questionModal() {
    //     let promptRet = await Modals.prompt({
    //         title: 'Hello',
    //         message: 'What\'s your name?'
    //     });
    //     console.log('Prompt ret', promptRet);
    // }
}
