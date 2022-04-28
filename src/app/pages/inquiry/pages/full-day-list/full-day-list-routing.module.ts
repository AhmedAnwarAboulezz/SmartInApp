import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFullDayListComponent } from './components';
import { FullDayListPage } from './full-day-list.page';

const routes: Routes = [
  {
    path: '',
    component: FullDayListPage,
    children: [
      {
        path: 'list',
        component: ListFullDayListComponent,
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
export class FullDayListPageRoutingModule {}
