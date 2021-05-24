import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Tab1Page} from './tab1.page';
import {DetailComponent} from './countries/detail/detail.component';
import {RegionComponent} from './countries/region/region.component';
import {GoogleMapComponent} from './views/google-map/google-map.component';

const routes: Routes = [
    {
        path: '',
        component: Tab1Page,
    },
    {
        path: 'country/:countryId',
        children: [
            {
                path: '',
                component: DetailComponent,
            },
            {
                path: 'regions',
                component: RegionComponent,
            }, {
                path: 'map',
                component: GoogleMapComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Tab1PageRoutingModule {
}
