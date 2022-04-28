import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsPage } from './requests.page';


const routes: Routes = [
  // {
  //   path: 'manager-part-day',
  //   loadChildren: () => import('./pages').then(m => m.ManagerPartDayPermissionModule)
  // },
  // {
  //   path: 'main-manager-requests',
  //   loadChildren: () => import('./pages').then((m) => m.MainManagerRequestsPageModule),
  // },
  // {
  //   path: '',
  //   redirectTo: 'main-manager-requests',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: RequestsPage,
    children: [
      {
        path: 'manager-part-day',
        loadChildren: () =>
          import('./pages').then((m) => m.ManagerPartDayPermissionModule),
      },
      {
        path: 'manager-full-day',
        loadChildren: () =>
          import('./pages').then((m) => m.ManagerFullDayPermissionModule),
      },
      {
        path: 'manager-leave',
        loadChildren: () =>
          import('./pages').then((m) => m.ManagerLeaveModule),
      },
      {
        path: 'manager-return-leave',
        loadChildren: () =>
          import('./pages').then((m) => m.ManagerReturnLeaveModule),
      },
      {
        path: 'manager-over-time',
        loadChildren: () => 
          import('./pages').then((m) => m.ManagerOverTimeModule),
      },
      {
        path: 'main-manager-requests',
        loadChildren: () =>
          import('./pages').then((m) => m.MainManagerRequestsPageModule),
      },
      {
        path: '',
        redirectTo: 'main-manager-requests',
        pathMatch: 'full',
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsPageRoutingModule {}
