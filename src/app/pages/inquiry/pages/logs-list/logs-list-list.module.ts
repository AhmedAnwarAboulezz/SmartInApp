import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

import { LogsListPageRoutingModule } from './logs-list-routing.module';
import { LogsListPage } from './logs-list.page';
import { ListLogsListComponent } from './components/list-logs-list/list-logs-list.component';
import { LogsListListItemComponent } from './components/logs-list-list-item/logs-list-list-item.component';
import { LogsFilterModalComponent } from './components/logs-filter-modal/logs-filter-modal.component';

const COMPONENTS = [
  LogsListPage,
  ListLogsListComponent,
  LogsListListItemComponent,LogsFilterModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LogsListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class LogsListPageModule {}
