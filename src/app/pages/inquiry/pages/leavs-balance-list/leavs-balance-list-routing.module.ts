import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLeavsBalanceListComponent } from './components';
import { LeavsBalanceListPage } from './leavs-balance-list.page';

const routes: Routes = [
  {
    path: '',
    component: LeavsBalanceListPage,
    children: [
      {
        path: 'list',
        component: ListLeavsBalanceListComponent,
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
export class LeavsBalanceListPageRoutingModule {}
