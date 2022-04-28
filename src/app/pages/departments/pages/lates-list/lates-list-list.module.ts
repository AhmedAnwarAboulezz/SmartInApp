import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LatesListPage } from './lates-list.page';

import { LatesListPageRoutingModule } from './lates-list-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

import {
  LatesListListItemComponent,
  ListLatesListComponent,
} from './components';

const COMPONENTS = [
  LatesListPage,
  LatesListListItemComponent,
  ListLatesListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LatesListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class LatesListPageModule {}
