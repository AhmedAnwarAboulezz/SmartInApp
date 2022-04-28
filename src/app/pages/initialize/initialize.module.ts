import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitializeComponent } from './initialize/initialize.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InitializeRoutingModule } from './initialize-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [InitializeComponent],
  imports: [
    CommonModule,
    //FormsModule,
    SharedModule,
    IonicModule,
    InitializeRoutingModule
  ]
})
export class InitializeModule { }
