import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPartDayBalanceListComponent } from './components/part-day-balance-list/list-part-day-balance-list.component';
import { PartDayBalanceListPage } from './part-day-balance-list.page';

const routes: Routes = [
  {
    path: '',
    component: PartDayBalanceListPage,
    children: [
      {
        path: 'list',
        component: ListPartDayBalanceListComponent,
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
export class PartDayBalanceListPageRoutingModule {}
