import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerOverTimeRoutingModule } from './manager-over-time-routing.module';

import { ListManagerOverTimesComponent, ManagerOverTimeListItemComponent} from './components';
import { ManagerOverTimePage } from './manager-over-time.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveOverTimeRequestPage } from './components/approve-overtime-request/approve-overtime-request.page';

const COMPONENTS = [
  ManagerOverTimePage,
  ListManagerOverTimesComponent,
  ManagerOverTimeListItemComponent,
  ApproveOverTimeRequestPage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    ManagerOverTimeRoutingModule,
  ],
  declarations: [...COMPONENTS],
})


export class ManagerOverTimeModule { }
