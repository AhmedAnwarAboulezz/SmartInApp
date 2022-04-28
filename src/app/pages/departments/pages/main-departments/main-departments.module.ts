import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgApexchartsModule } from 'ng-apexcharts';

import { MainDepartmentsPageRoutingModule } from './main-departments-routing.module';

import { MainDepartmentsPage } from './main-departments.page';
import { SharedModule } from '../../../../shared/shared.module';
import {
  AttendancePage,
  DashboardPage,
  OtherPage,
  SignPage,
  TransationsPage,
} from '../../components';

const COMPONENTS = [
  DashboardPage,
  MainDepartmentsPage,
  AttendancePage,
  TransationsPage,
  OtherPage,
  SignPage,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MainDepartmentsPageRoutingModule,
    NgApexchartsModule,
  ],
  declarations: [...COMPONENTS],
})
export class MainDepartmentsPageModule {}
