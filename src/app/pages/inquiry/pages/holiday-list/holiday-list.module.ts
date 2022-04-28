import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../../shared/shared.module';

import {
  HolidayListListItemComponent,
  ListHolidayListComponent,
} from './components';
import { HolidayListPageRoutingModule } from './holiday-list-routing.module';
import { HolidayListPage } from './holiday-list.page';
import { HolidayFilterModalComponent } from './components/holiday-filter-modal/holiday-filter-modal.component';

const COMPONENTS = [
  HolidayListPage,
  HolidayListListItemComponent,
  ListHolidayListComponent,
  HolidayFilterModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    HolidayListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class HolidayListPageModule {}
