import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { PartDayBalanceListPageRoutingModule } from './part-day-balance-list-routing.module';
import { SharedModule } from '../../../../shared/shared.module';


import { PartDayBalanceListPage } from './part-day-balance-list.page';
import { ListPartDayBalanceListComponent } from './components/part-day-balance-list/list-part-day-balance-list.component';
import { PartDayBalanceListListItemComponent } from './components/part-day-balance-list-list-item/part-day-balance-list-list-item.component';
import { PartDayBalanceFilterModalComponent } from './components/part-day-balance-filter-modal/part-day-balance-filter-modal.component';

const COMPONENTS = [
  PartDayBalanceListPage,
  ListPartDayBalanceListComponent,
  PartDayBalanceListListItemComponent,
  PartDayBalanceFilterModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PartDayBalanceListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class PartDayBalanceListPageModule {}
