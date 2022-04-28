import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveFullDayPermissionRequestPage } from './components/approve-full-day-permission-request/approve-full-day-permission-request.page';
import { ListManagerFullDayPermissionsComponent } from './components/list-manager-full-day-permissions/list-manager-full-day-permissions.component';
import { ManagerFullDayPermissionPage } from './manager-full-day-permission.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerFullDayPermissionPage,
    children: [
      {
        path: 'list',
        component: ListManagerFullDayPermissionsComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'approve-full-day-permission-request/:id',
        component:ApproveFullDayPermissionRequestPage
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerFullDayPermissionRoutingModule { }

