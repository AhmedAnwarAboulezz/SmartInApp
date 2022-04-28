import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AdminListPage } from './admin-list.page';

import { AdminListPageRoutingModule } from './admin-list-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

import {
  ListAdminListComponent,
  AdminListListItemComponent,
} from './components';

const COMPONENTS = [
  AdminListPage,
  ListAdminListComponent,
  AdminListListItemComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AdminListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class AdminListPageModule {}
