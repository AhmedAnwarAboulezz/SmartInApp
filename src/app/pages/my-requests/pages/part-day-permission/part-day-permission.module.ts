import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartDayPermissionPage } from './part-day-permission.page';

import { PartDayPermissionPageRoutingModule } from './part-day-permission-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import {
  AddPartDayPermissionsComponent,
  ListPartDayPermissionsComponent,
  PartDayFilterModalComponent,
  PartDayListItemComponent,
} from './components';
import { PermissionRequestDetailsPage } from './components/permission-request-details/permission-request-details.page';

const COMPONENTS = [
  PartDayPermissionPage,
  ListPartDayPermissionsComponent,
  PartDayFilterModalComponent,
  PartDayListItemComponent,
  AddPartDayPermissionsComponent,
  PermissionRequestDetailsPage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    PartDayPermissionPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class PartDayPermissionPageModule {}
