import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  isConnected$: Observable<boolean>;



  constructor(httpClient: HttpClient) {}

  ngOnInit(): void {
    console.log('chat tab');
  }
}