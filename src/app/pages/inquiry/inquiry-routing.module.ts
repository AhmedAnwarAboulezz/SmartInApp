import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignPage } from './components';
import { InquiryPage } from './inquiry.page';

const routes: Routes = [
  {
    path: '',
    component: InquiryPage,
    children: [
      {
        path: 'main-inquiry',
        loadChildren: () =>
          import('./pages').then((m) => m.MainInquiryPageModule),
      },
      {
        path: 'attendance-list',
        loadChildren: () =>
          import('./pages').then((m) => m.AttendanceListPageModule),
      },
      {
        path: 'admin-list',
        loadChildren: () =>
          import('./pages').then((m) => m.AdminListPageModule),
      },
      {
        path: 'logs-list',
        loadChildren: () =>
          import('./pages').then((m) => m.LogsListPageModule),
      },
      {
        path: 'leavs-list',
        loadChildren: () =>
          import('./pages').then((m) => m.LeavsListPageModule),
      },
      {
        path: 'leavs-balance-list',
        loadChildren: () =>
          import('./pages').then((m) => m.LeavsBalanceListPageModule),
      },
      {
        path: 'part-day-list',
        loadChildren: () =>
          import('./pages').then((m) => m.PartDayListPageModule),
      },
      {
        path: 'part-day-balance-list',
        loadChildren: () =>
          import('./pages').then((m) => m.PartDayBalanceListPageModule),
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
        path: 'holiday-list',
        loadChildren: () =>
          import('./pages').then((m) => m.HolidayListPageModule),
      },
      {
        path: 'sign',
        component: SignPage,
      },
      {
        path: '',
        redirectTo: 'main-inquiry',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiryRoutingModule { }
