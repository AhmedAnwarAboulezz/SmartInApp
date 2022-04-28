import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LeavsListPage } from './leavs-list.page';

import { LeavsListPageRoutingModule } from './leavs-list-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

import {
  LeavsListListItemComponent,
  ListLeavsListComponent,
} from './components';
import { LeavsFilterModalComponent } from './components/leavs-filter-modal/leavs-filter-modal.component';

const COMPONENTS = [
  LeavsListPage,
  LeavsListListItemComponent,
  ListLeavsListComponent,
  LeavsFilterModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LeavsListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class LeavsListPageModule {}
