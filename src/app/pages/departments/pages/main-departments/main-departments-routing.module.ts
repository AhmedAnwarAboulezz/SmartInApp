import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainDepartmentsPage } from './main-departments.page';

const routes: Routes = [
  {
    path: '',
    component: MainDepartmentsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainDepartmentsPageRoutingModule {}
