import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignPageRoutingModule } from './sign-routing.module';

import { SignPage } from './sign.page';

import { TestBeaconRegion2Component } from '../test-beacon-region2/test-beacon-region2.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestBeaconRegionComponent } from './test-beacon-region/test-beacon-region.component';
import { TestBeaconRegion3Component } from './test-beacon-region3/test-beacon-region3.component';
import { TestBeaconRegion4Component } from './test-beacon-region4/test-beacon-region4.component';
import { TestBeaconRegionItemComponent } from './test-beacon-region-item/test-beacon-region-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignPageRoutingModule,ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    SignPage, 
    TestBeaconRegion2Component,
    TestBeaconRegionComponent,
    TestBeaconRegion3Component,
    TestBeaconRegion4Component,
    TestBeaconRegionItemComponent
  ]
})
export class SignPageModule {}
