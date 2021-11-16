import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformInfoComponent } from './platform-info/platform-info.component';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'platform-info',
    component: PlatformInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
