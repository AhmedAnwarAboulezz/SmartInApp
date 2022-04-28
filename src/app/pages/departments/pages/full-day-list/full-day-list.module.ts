import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FullDayListPage } from './full-day-list.page';

import { FullDayListPageRoutingModule } from './full-day-list-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

import {
  ListFullDayListComponent,
  FullDayListListItemComponent,
} from './components';

const COMPONENTS = [
  FullDayListPage,
  ListFullDayListComponent,
  FullDayListListItemComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FullDayListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class FullDayListPageModule {}
