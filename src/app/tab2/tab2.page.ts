import { Component, OnInit } from '@angular/core';
import { ProductService } from './products/products.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log(`Tab 2 started`);
  }

  triggerCall(): void {
    console.log(`Call`);
    this.productService.getProducts();
  }

}
