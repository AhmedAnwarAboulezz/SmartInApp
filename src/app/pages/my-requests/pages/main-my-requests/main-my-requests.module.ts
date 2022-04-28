import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainMyRequestsPageRoutingModule } from './main-my-requests-routing.module';

import { MainMyRequestsPage } from './main-my-requests.page';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MainMyRequestsPageRoutingModule,
  ],
  declarations: [MainMyRequestsPage],
})
export class MainMyRequestsPageModule {}
