import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { FullDayPermissionPageRoutingModule } from './full-day-permission-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import {
  ListFullDayPermissionsComponent,
  AddFullDayPermissionsComponent,
  FullDayListItemComponent,
} from './components';
import { FullDayPermissionPage } from './full-day-permission.page';
import { FullDayRequestDetailsPage } from './components/full-day-request-details/full-day-request-details.page';

const COMPONENTS = [
  FullDayPermissionPage,
  ListFullDayPermissionsComponent,
  AddFullDayPermissionsComponent,
  FullDayListItemComponent,
  FullDayRequestDetailsPage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FullDayPermissionPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class FullDayPermissionPageModule {}
