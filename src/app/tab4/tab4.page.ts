import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '@swisscom-app/login';
import { PlatformService } from '../services/platform.service';
import { LoginPluginWebPlugin, SysInfoPlugin } from './tab4.module';
import { AppNextEchoService, EchoService, LoginService, AppNextLoginService } from 'myswisscom-appnext';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  isMobileApp: boolean;

  constructor(private platormService: PlatformService) {}

  ngOnInit(): void {
    console.log('plugins tab');
    AppNextEchoService.echo({
      value: 'echo!'
    }).then(() => {
      console.log('[AppNextEchoService] done')
    });

    this.isMobileApp = this.platormService.isMobileApp();
  }

  callEcho(mesage: string = 'callEcho'): void {
    Login.echo({
      value: mesage,
    }).then(() => {
      console.log('DONE!');
    });
  }

  callEchoUp(mesage: string = 'callEchoUp'): void {
    Login.echoUp({
      value: mesage,
    }).then(() => {
      console.log('DONE!');
    });
  }

  callEchoMyPLugin(mesage: string = 'callEcho'): void {


    LoginPluginWebPlugin.echo({
      value: mesage,
    }).then(() => {
      console.log('DONE!');
    });
  }

  callSysInfo(): void {
    SysInfoPlugin.getAppInfo({
      value: 'Some Message',
    }).then(() => {
      console.log('callSysInfo!');
    });
  }
}
