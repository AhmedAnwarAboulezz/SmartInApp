import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuardManager, AuthGuardManagerOrTeam } from 'src/app/core/services/guards/authguard.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    HomePageRoutingModule,
  ],
  providers: [AuthGuardManager, AuthGuardManagerOrTeam],
  declarations: [HomePage],
})
export class HomePageModule {}
