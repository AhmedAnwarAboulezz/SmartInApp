import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignPage } from './components';
import { DepartmentsPage } from './departments.page';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsPage,
    children: [
      {
        path: 'main-departments',
        loadChildren: () =>
          import('./pages').then((m) => m.MainDepartmentsPageModule),
      },
      {
        path: 'attendance-list',
        loadChildren: () =>
          import('./pages').then((m) => m.AttendanceListPageModule),
      },
      {
        path: 'lates-list',
        loadChildren: () =>
          import('./pages').then((m) => m.LatesListPageModule),
      },
      {
        path: 'admin-list',
        loadChildren: () =>
          import('./pages').then((m) => m.AdminListPageModule),
      },
      {
        path: 'live-logs-list',
        loadChildren: () =>
          import('./pages').then((m) => m.LiveLogsListPageModule),
      },
      {
        path: 'leavs-list',
        loadChildren: () =>
          import('./pages').then((m) => m.LeavsListPageModule),
      },
      {
        path: 'part-day-list',
        loadChildren: () =>
          import('./pages').then((m) => m.PartDayListPageModule),
      },
      {
        path: 'full-day-list',
        loadChildren: () =>
          import('./pages').then((m) => m.FullDayListPageModule),
      },
      {
        path: 'allowance-list',
        loadChildren: () =>
          import('./pages').then((m) => m.AllowanceListPageModule),
      },
      {
        path: 'deduction-list',
        loadChildren: () =>
          import('./pages').then((m) => m.DeductionListPageModule),
      },
      {
        path: 'sign',
        component: SignPage,
      },
      {
        path: '',
        redirectTo: 'main-departments',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentsPageRoutingModule {}
