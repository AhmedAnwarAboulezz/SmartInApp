import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PartDayListPage } from './part-day-list.page';

import { PartDayListPageRoutingModule } from './part-day-list-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

import {
  ListPartDayListComponent,
  PartDayListListItemComponent,
} from './components';
import { PartDayFilterModalComponent } from './components/part-day-filter-modal/part-day-filter-modal.component';

const COMPONENTS = [
  PartDayListPage,
  ListPartDayListComponent,
  PartDayListListItemComponent,
  PartDayFilterModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PartDayListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class PartDayListPageModule {}
