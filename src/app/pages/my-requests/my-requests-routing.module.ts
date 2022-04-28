import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRequestsPage } from './my-requests.page';

const routes: Routes = [
  {
    path: '',
    component: MyRequestsPage,
    children: [
      {
        path: 'part-day',
        loadChildren: () =>
          import('./pages').then((m) => m.PartDayPermissionPageModule),
      },
      {
        path: 'full-day',
        loadChildren: () =>
          import('./pages').then((m) => m.FullDayPermissionPageModule),
      },
      {
        path: 'request-leave',
        loadChildren: () =>
          import('./pages').then((m) => m.RequestLeavePageModule),
      },
      {
        path: 'return-from-leave',
        loadChildren: () =>
          import('./pages').then((m) => m.ReturnFromLeavePageModule),
      },
      {
        path: 'over-time',
        loadChildren: () => 
          import('./pages').then((m) => m.OverTimePageModule),
      },
      {
        path: 'main-my-requests',
        loadChildren: () =>
          import('./pages').then((m) => m.MainMyRequestsPageModule),
      },
      {
        path: '',
        redirectTo: 'main-my-requests',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRequestsPageRoutingModule {}
