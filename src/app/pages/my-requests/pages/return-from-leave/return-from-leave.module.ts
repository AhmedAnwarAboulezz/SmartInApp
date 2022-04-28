import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReturnFromLeavePage } from './return-from-leave.page';

import { ReturnFromLeavePageRoutingModule } from './return-from-leave-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ReturnLeaveListItemComponent } from './components/return-leave-list-item/return-leave-list-item.component';
import { ListReturnLeaveComponent } from './components/list-return-leave/list-return-leave.component';
import { AddReturnLeaveComponent } from './components/add-return-leave/add-return-leave.component';
import { UpcomingReturnLeaveListComponent } from './components/upcoming-return-leave-list/upcoming-return-leave-list.component';
import { ReturnLeaveRequestDetailsComponent } from './components/return-leave-request-details/return-leave-request-details.component';

const components = [
  ReturnFromLeavePage,
  ReturnLeaveListItemComponent,
  ListReturnLeaveComponent,
  UpcomingReturnLeaveListComponent,
  AddReturnLeaveComponent,
  ReturnLeaveRequestDetailsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReturnFromLeavePageRoutingModule,
  ],
  declarations: [...components],
})
export class ReturnFromLeavePageModule {}
