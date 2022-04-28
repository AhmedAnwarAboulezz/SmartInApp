import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { NotificationsListItemComponent } from './components';
import { NotificationsPageRoutingModule } from './notifications-routing.module';
import { NotificationsPage } from './notifications.page';

const COMPONENTS = [NotificationsListItemComponent, NotificationsPage];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NotificationsPageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class NotificationsPageModule {}
