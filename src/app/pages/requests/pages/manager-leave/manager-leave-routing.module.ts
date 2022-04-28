import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveLeaveRequestPage } from './components/approve-leave-request/approve-leave-request.page';
import { ListManagerLeavesComponent } from './components/list-manager-leaves/list-manager-leaves.component';
import { ManagerLeavePage } from './manager-leave.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerLeavePage,
    children: [
      {
        path: 'list',
        component: ListManagerLeavesComponent,
      },
      {
        path: 'approve-leave-request/:id',
        component: ApproveLeaveRequestPage
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
  exports: [RouterModule]
})
export class ManagerLeaveRoutingModule { }

