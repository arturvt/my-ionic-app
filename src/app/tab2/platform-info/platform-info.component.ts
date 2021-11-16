import { Component, OnInit } from '@angular/core';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-platform-info',
  templateUrl: 'platform-info.component.html',
  styleUrls: ['platform-info.component.scss'],
})
export class PlatformInfoComponent implements OnInit {
  constructor(public platform: PlatformService){}

  ngOnInit(): void {

  }
}