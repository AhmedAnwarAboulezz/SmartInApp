import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddRequestLeaveComponent,
  ListRequestLeaveComponent,
} from './components';
import { LeaveRequestDetailsPage } from './components/leave-request-details/leave-request-details.page';
import { RequestLeavePage } from './request-leave.page';

const routes: Routes = [
  {
    path: '',
    component: RequestLeavePage,
    children: [
      {
        path: 'list',
        component: ListRequestLeaveComponent,
      },
      {
        path: 'add',
        component: AddRequestLeaveComponent,
      },
      {
        path: 'edit/:id',
        component: AddRequestLeaveComponent,
      },
      {
        path: 'leave-request-details/:id',
        component: LeaveRequestDetailsPage
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
export class RequestLeavePageRoutingModule {}
