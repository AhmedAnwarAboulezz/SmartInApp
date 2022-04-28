import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovePermissionRequestPage } from './components/approve-permission-request/approve-permission-request.page';
import { ListManagerPartDayPermissionsComponent } from './components/list-manager-part-day-permissions/list-manager-part-day-permissions.component';
import { ManagerPartDayPermissionPage } from './manager-part-day-permission.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerPartDayPermissionPage,
    children: [
      {
        path: 'list',
        component: ListManagerPartDayPermissionsComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'approve-permission-request/:id',
        component: ApprovePermissionRequestPage
      }
    ],
  },

  // {
  //   path: 'permission-tabs',
  //   component: ManagerPartDayPermissionPage,
  //   children: [
  //     {
  //       path: 'list',
  //       component: ListManagerPartDayPermissionsComponent
  //     },
  //   ]
  // },
  // {
  //   path: '',
  //   redirectTo: 'permission-tabs/list',
  //   pathMatch: 'full'
  // }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerPartDayPermissionRoutingModule { }

