import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-closeable-modal',
  templateUrl: './closeable-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseableModalComponent {}
