import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AllowanceListPage } from './allowance-list.page';

import { AllowanceListPageRoutingModule } from './allowance-list-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

import {
  AllowanceListListItemComponent,
  ListAllowanceListComponent,
} from './components';

const COMPONENTS = [
  AllowanceListPage,
  AllowanceListListItemComponent,
  ListAllowanceListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllowanceListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class AllowanceListPageModule {}
