import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('sdx tab');
  }

  startListener(text: string) {
    console.log('start listening');

    // listens to a window event
    window.addEventListener(text, (event) => {});
    document.addEventListener(text, (event) => {});
  }
}
