import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPartDayListComponent } from './components';
import { PartDayListPage } from './part-day-list.page';

const routes: Routes = [
  {
    path: '',
    component: PartDayListPage,
    children: [
      {
        path: 'list',
        component: ListPartDayListComponent,
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
export class PartDayListPageRoutingModule {}
