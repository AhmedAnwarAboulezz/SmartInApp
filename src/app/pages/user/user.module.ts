import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { UserPageRoutingModule } from './user-routing.module';
import { UserPage } from './user.page';
import { ChangePasswordComponent, ProfileComponent } from './components';

const COMPONENTS = [ChangePasswordComponent, ProfileComponent, UserPage];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UserPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class UserPageModule {}
