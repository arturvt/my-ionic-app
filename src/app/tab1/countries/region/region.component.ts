import { Component, Input } from "@angular/core";
import { RegionFull } from "../region";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class Region {
 @Input() region: RegionFull;

}