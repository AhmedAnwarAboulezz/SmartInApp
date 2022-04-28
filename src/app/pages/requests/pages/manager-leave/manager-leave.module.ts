import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerLeaveRoutingModule } from './manager-leave-routing.module';

import { ListManagerLeavesComponent, ManagerLeaveListItemComponent} from './components';
import { ManagerLeavePage } from './manager-leave.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveLeaveRequestPage } from './components/approve-leave-request/approve-leave-request.page';

const COMPONENTS = [
  ManagerLeavePage,
  ListManagerLeavesComponent,
  ManagerLeaveListItemComponent,
  ApproveLeaveRequestPage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    ManagerLeaveRoutingModule,
  ],
  declarations: [...COMPONENTS],
})


export class ManagerLeaveModule { }
