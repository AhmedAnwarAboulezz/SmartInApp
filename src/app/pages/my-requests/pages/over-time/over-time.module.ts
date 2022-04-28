import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OverTimePage } from './over-time.page';

import { OverTimePageRoutingModule } from './over-time-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import {
  AddOverTimeComponent,
  AddOverTimeListItemComponent,
  ListOverTimeComponent,
  OverTimeListItemComponent,
} from './components';
import { OverTimeRequestDetailsComponent } from './components/overtime-request-details/overtime-request-details.component';

const COMPONENTS = [
  OverTimePage,
  AddOverTimeComponent,
  ListOverTimeComponent,
  OverTimeListItemComponent,
  AddOverTimeListItemComponent,
  OverTimeRequestDetailsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OverTimePageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class OverTimePageModule {}
