import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OrganizationPage } from './organization.page';

import { OrganizationPageRoutingModule } from './organization-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationPageRoutingModule,
    SharedModule
  ],
  declarations: [OrganizationPage],
})
export class OrganizationPageModule {}
