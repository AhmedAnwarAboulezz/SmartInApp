import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceListPage } from './attendance-list.page';
import { ListAttendanceListComponent } from './components/list-attendance-list/list-attendance-list.component';

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
