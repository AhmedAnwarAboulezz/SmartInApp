import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerFullDayPermissionRoutingModule } from './manager-full-day-permission-routing.module';

import { ListManagerFullDayPermissionsComponent, ManagerFullDayListItemComponent} from './components';
import { ManagerFullDayPermissionPage } from './manager-full-day-permission.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveFullDayPermissionRequestPage } from './components/approve-full-day-permission-request/approve-full-day-permission-request.page';

const COMPONENTS = [
  ManagerFullDayPermissionPage,
  ListManagerFullDayPermissionsComponent,
  ManagerFullDayListItemComponent,
  ApproveFullDayPermissionRequestPage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    ManagerFullDayPermissionRoutingModule,
  ],
  declarations: [...COMPONENTS],
})


export class ManagerFullDayPermissionModule { }
