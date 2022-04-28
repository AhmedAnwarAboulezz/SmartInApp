import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DeductionListPage } from './deduction-list.page';

import { DeductionListPageRoutingModule } from './deduction-list-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

import {
  DeductionListListItemComponent,
  ListDeductionListComponent,
} from './components';
import { DeductionFilterModalComponent } from './components/deduction-filter-modal/deduction-filter-modal.component';

const COMPONENTS = [
  DeductionListPage,
  DeductionListListItemComponent,
  ListDeductionListComponent,
  DeductionFilterModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DeductionListPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class DeductionListPageModule {}
