import { NgModule } from '@angular/core';
import { AttendanceListPage } from './attendance-list.page';

import { AttendanceListPageRoutingModule } from './attendance-list-routing.module';
import { AttendanceListItemComponent } from './components';
import { AttendanceFilterModalComponent } from './components/attendance-filter-modal/attendance-filter-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListAttendanceListComponent } from './components/list-attendance-list/list-attendance-list.component';

const COMPONENTS = [
  AttendanceListItemComponent,
  AttendanceListPage,
  AttendanceFilterModalComponent,
  ListAttendanceListComponent,
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
