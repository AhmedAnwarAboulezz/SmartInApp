import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

import {
  ListLiveLogsListComponent,
  LiveLogsListListItemComponent,
} from './components';
import { LiveLogsListPage } from './live-logs-list.page';
import { LiveLogsListPageRoutingModule } from './live-logs-list-routing.module';

const COMPONENTS = [
  LiveLogsListPage,
  ListLiveLogsListComponent,
  LiveLogsListListItemComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LiveLogsListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class LiveLogsListPageModule {}
