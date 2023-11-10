import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sdx-page',
  templateUrl: './sdx-page.component.html',
  styleUrls: ['./sdx-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdxPageComponent {
  startListener(text: string) {
    console.log('start listening');

    // listens to a window event
    window.addEventListener(text, (event) => {
      console.log('event', event);
    });
    document.addEventListener(text, (event) => {
      console.log('event', event);
    });
  }
}
