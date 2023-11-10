import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core/components';

interface Content {
  title: string;
  url: string;
  visible: boolean;
  value: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  apiLoaded: Observable<boolean>;
  showSubHubIframe: boolean = false;
  @ViewChild(IonModal) modal: IonModal;

  visibleItems: Content[] = [
    {
      title: 'Swisscom Page',
      url: 'https://vega.test2.swisscom.ch/myswisscom/assets/oidc/index.html',
      visible: false,
      value: 'swisscom',
    },
    {
      title: 'SubHub Logged In',
      url: 'https://vega.test2.swisscom.ch/myswisscom/assets/oidc/index.html?exchangeId=8955d90c-74e7-4d1b-a6eb-76a7247b04b4&redirectUrl=https%3A%2F%2Fvega.test2.swisscom.ch%2Fsubhub%3Flang%3Den&lang=en',
      visible: false,
      value: 'subhub',
    },
    {
      title: 'MySwisscom Page',
      url: 'https://www.swisscom.ch/myswisscom',
      visible: false,
      value: 'myswisscom',
    },
  ];

  selected = this.visibleItems[1];

  handleChange(event: any) {
    this.selected = event;
  }

  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log('modal dismissed');
    }
  }

  ngOnInit(): void {}
}
