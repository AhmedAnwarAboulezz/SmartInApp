import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestBeaconRegion2Component } from '../test-beacon-region2/test-beacon-region2.component';


import { SignPage } from './sign.page';
import { TestBeaconRegionComponent } from './test-beacon-region/test-beacon-region.component';
import { TestBeaconRegion4Component } from './test-beacon-region4/test-beacon-region4.component';

const routes: Routes = [
  {
    path: '',
    component: SignPage
  },
  {
    path: 'test-ibeacon-region2',
    component: TestBeaconRegion2Component
  },
  {
    path: 'test-ibeacon-region',
    component: TestBeaconRegionComponent
  },
  {
    path: 'test-ibeacon-region4',
    component: TestBeaconRegion4Component
  }
  
   
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignPageRoutingModule {}
