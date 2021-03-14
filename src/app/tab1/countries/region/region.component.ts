import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Region } from "../region";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent {
  @Input() region: Region;
  constructor(private modalCtrl:ModalController){}

  dismiss():void {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}