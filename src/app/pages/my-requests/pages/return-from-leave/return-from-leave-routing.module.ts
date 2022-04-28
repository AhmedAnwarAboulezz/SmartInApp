import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReturnLeaveComponent } from './components/add-return-leave/add-return-leave.component';
import { ListReturnLeaveComponent } from './components/list-return-leave/list-return-leave.component';
import { ReturnLeaveRequestDetailsComponent } from './components/return-leave-request-details/return-leave-request-details.component';
import { ReturnFromLeavePage } from './return-from-leave.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnFromLeavePage,
    children: [
      {
        path: 'list',
        component: ListReturnLeaveComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path:'add-return-leave',
        component: AddReturnLeaveComponent
      },
      {
        path: 'return-leave-request-details/:id',
        component: ReturnLeaveRequestDetailsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnFromLeavePageRoutingModule {}
