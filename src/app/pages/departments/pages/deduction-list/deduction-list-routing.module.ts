import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDeductionListComponent } from './components';
import { DeductionListPage } from './deduction-list.page';

const routes: Routes = [
  {
    path: '',
    component: DeductionListPage,
    children: [
      {
        path: 'list',
        component: ListDeductionListComponent,
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
export class DeductionListPageRoutingModule {}
