import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAttendanceListComponent } from './components';
import { AttendanceListPage } from './attendance-list.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceListPage,
    children: [
      {
        path: 'list',
        component: ListAttendanceListComponent,
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
export class AttendanceListPageRoutingModule {}
