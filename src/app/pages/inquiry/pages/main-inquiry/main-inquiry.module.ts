import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgApexchartsModule } from 'ng-apexcharts';

import { MainInquiryPageRoutingModule } from './main-inquiry-routing.module';

import { MainInquiryPage } from './main-inquiry.page';
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
  MainInquiryPage,
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
    MainInquiryPageRoutingModule,
    NgApexchartsModule,
  ],
  declarations: [...COMPONENTS],
})
export class MainInquiryPageModule {}
