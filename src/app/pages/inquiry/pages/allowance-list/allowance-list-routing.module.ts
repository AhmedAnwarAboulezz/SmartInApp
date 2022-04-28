import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAllowanceListComponent } from './components';
import { AllowanceListPage } from './allowance-list.page';

const routes: Routes = [
  {
    path: '',
    component: AllowanceListPage,
    children: [
      {
        path: 'list',
        component: ListAllowanceListComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllowanceListPageRoutingModule {}
