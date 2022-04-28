import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerPartDayPermissionRoutingModule } from './manager-part-day-permission-routing.module';

import { ListManagerPartDayPermissionsComponent, ManagerPartDayListItemComponent} from './components';
import { ManagerPartDayPermissionPage } from './manager-part-day-permission.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovePermissionRequestPage } from './components/approve-permission-request/approve-permission-request.page';

const COMPONENTS = [
  ManagerPartDayPermissionPage,
  ListManagerPartDayPermissionsComponent,
  ManagerPartDayListItemComponent,
  ApprovePermissionRequestPage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    ManagerPartDayPermissionRoutingModule,
  ],
  declarations: [...COMPONENTS],
})


export class ManagerPartDayPermissionModule { }
