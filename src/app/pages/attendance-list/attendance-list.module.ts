import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AttendanceListPage } from './attendance-list.page';

import { AttendanceListPageRoutingModule } from './attendance-list-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AttendanceListItemComponent } from './components';
import { AttendanceFilterModalComponent } from './components/attendance-filter-modal/attendance-filter-modal.component';

const COMPONENTS = [
  AttendanceListItemComponent,
  AttendanceListPage,
  AttendanceFilterModalComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AttendanceListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class AttendanceListPageModule {}
