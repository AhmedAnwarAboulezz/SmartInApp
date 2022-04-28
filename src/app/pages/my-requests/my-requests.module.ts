import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MyRequestsPage } from './my-requests.page';

import { MyRequestsPageRoutingModule } from './my-requests-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MyRequestsPageRoutingModule,
  ],
  declarations: [MyRequestsPage],
})
export class MyRequestsPageModule {}
