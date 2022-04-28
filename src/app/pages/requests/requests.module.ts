import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RequestsPage } from './requests.page';

import { RequestsPageRoutingModule } from './requests-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RequestsPageRoutingModule,
  ],
  declarations: [RequestsPage],
})
export class RequestsPageModule {}