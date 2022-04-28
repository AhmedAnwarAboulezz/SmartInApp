import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ListFullDayPermissionsComponent,
  AddFullDayPermissionsComponent,
} from './components';
import { FullDayRequestDetailsPage } from './components/full-day-request-details/full-day-request-details.page';
import { FullDayPermissionPage } from './full-day-permission.page';

const routes: Routes = [
  {
    path: '',
    component: FullDayPermissionPage,
    children: [
      {
        path: 'list',
        component: ListFullDayPermissionsComponent,
      },
      {
        path: 'add',
        component: AddFullDayPermissionsComponent,
      },
      {
        path: 'edit/:id',
        component: AddFullDayPermissionsComponent,
      },
      {
        path: 'full-day-request-details/:id',
        component: FullDayRequestDetailsPage
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
export class FullDayPermissionPageRoutingModule {}
