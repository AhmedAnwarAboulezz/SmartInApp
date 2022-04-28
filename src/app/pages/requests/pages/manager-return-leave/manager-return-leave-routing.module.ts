import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveReturnLeaveRequestPageComponent } from './components/approve-return-leave-request-page/approve-return-leave-request-page.component';
import { ListManagerReturnLeavesComponent } from './components/list-manager-return-leaves/list-manager-return-leaves.component';
import { ManagerReturnLeavePage } from './manager-return-leave.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerReturnLeavePage,
    children: [
      {
        path: 'list',
        component: ListManagerReturnLeavesComponent,
      },
      {
        path: 'approve-return-leave-request/:id',
        component: ApproveReturnLeaveRequestPageComponent
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
export class ManagerReturnLeaveRoutingModule { }

