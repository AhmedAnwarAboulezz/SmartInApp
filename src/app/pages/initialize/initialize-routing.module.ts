import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { InitializeComponent } from './initialize/initialize.component';



const routes: Routes = [
  {
    path: '',
    component: InitializeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitializeRoutingModule {}