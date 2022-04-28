import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerReturnLeaveRoutingModule } from './manager-return-leave-routing.module';

import { ListManagerReturnLeavesComponent, ManagerReturnLeaveListItemComponent} from './components';
import { ManagerReturnLeavePage } from './manager-return-leave.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveReturnLeaveRequestPageComponent } from './components/approve-return-leave-request-page/approve-return-leave-request-page.component';

const COMPONENTS = [
  ManagerReturnLeavePage,
  ListManagerReturnLeavesComponent,
  ManagerReturnLeaveListItemComponent,
  ApproveReturnLeaveRequestPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    ManagerReturnLeaveRoutingModule,
  ],
  declarations: [...COMPONENTS],
})


export class ManagerReturnLeaveModule { }
