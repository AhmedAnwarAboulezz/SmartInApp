import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DepartmentsPage } from './departments.page';

import { DepartmentsPageRoutingModule } from './departments-routing.module';
import { MainDepartmentsPageModule } from './pages';

const MODULES = [MainDepartmentsPageModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentsPageRoutingModule,
    ...MODULES,
  ],
  declarations: [DepartmentsPage],
})
export class DepartmentsPageModule {}
