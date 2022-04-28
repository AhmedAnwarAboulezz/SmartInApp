import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../../shared/shared.module';


import { LeavsBalanceListPageRoutingModule } from './leavs-balance-list-routing.module';
import { LeavsBalanceListPage } from './leavs-balance-list.page';
import { LeavsBalanceListListItemComponent } from './components/leavs-balance-list-list-item/leavs-balance-list-list-item.component';
import { ListLeavsBalanceListComponent } from './components';
import { LeavsBalanceFilterModalComponent } from './components/leavs-balance-filter-modal/leavs-balance-filter-modal.component';

const COMPONENTS = [
  LeavsBalanceListPage,
  LeavsBalanceListListItemComponent,
  ListLeavsBalanceListComponent,
  LeavsBalanceFilterModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LeavsBalanceListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class LeavsBalanceListPageModule {}
