import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddPartDayPermissionsComponent,
  ListPartDayPermissionsComponent,
} from './components';
import { PermissionRequestDetailsPage } from './components/permission-request-details/permission-request-details.page';
import { PartDayPermissionPage } from './part-day-permission.page';

const routes: Routes = [
  {
    path: '',
    component: PartDayPermissionPage,
    children: [
      {
        path: 'list',
        component: ListPartDayPermissionsComponent,
      },
      {
        path: 'add',
        component: AddPartDayPermissionsComponent,
      },
      {
        path: 'edit/:id',
        component: AddPartDayPermissionsComponent,
      },
      {
        path: 'permission-request-details/:id',
        component: PermissionRequestDetailsPage
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
export class PartDayPermissionPageRoutingModule {}
