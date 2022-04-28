import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainManagerRequestsPageRoutingModule } from './main-manager-requests-routing.module';

import { MainManagerRequestsPage } from './main-manager-requests.page';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MainManagerRequestsPageRoutingModule,
  ],
  declarations: [MainManagerRequestsPage],
})
export class MainManagerRequestsPageModule {}
