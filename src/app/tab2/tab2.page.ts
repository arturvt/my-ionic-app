import { Component, OnInit } from '@angular/core';
import { ProductService } from './products/products.service';
import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
  console.log(`Tab 2 started`);
  Browser.prefetch({
    urls: [
      'https://www.swisscom.ch'
    ]
  }).then(_ => console.log('prefetched'));
  }

  triggerCall(): void {
    console.log(`Call`);
    this.productService.getProducts();
  }

  async openBrowser() {
    await Browser.open({
      url: 'https://www.swisscom.ch'
    });
  }

}
