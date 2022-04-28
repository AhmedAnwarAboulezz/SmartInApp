import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListHolidayListComponent } from './components';
import { HolidayListPage } from './holiday-list.page';

const routes: Routes = [
  {
    path: '',
    component: HolidayListPage,
    children: [
      {
        path: 'list',
        component: ListHolidayListComponent,
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
export class HolidayListPageRoutingModule {}
