import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RequestLeavePage } from './request-leave.page';

import { RequestLeavePageRoutingModule } from './request-leave-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

import {
  AddRequestLeaveComponent,
  ListRequestLeaveComponent,
  RequestLeaveListItemComponent,
} from './components';
import { LeaveRequestDetailsPage } from './components/leave-request-details/leave-request-details.page';

const COMPONENTS = [
  RequestLeavePage,
  AddRequestLeaveComponent,
  ListRequestLeaveComponent,
  RequestLeaveListItemComponent,
  LeaveRequestDetailsPage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RequestLeavePageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class RequestLeavePageModule {}
