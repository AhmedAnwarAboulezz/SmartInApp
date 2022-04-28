import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveOverTimeRequestPage } from './components/approve-overtime-request/approve-overtime-request.page';
import { ListManagerOverTimesComponent } from './components/list-manager-over-times/list-manager-over-times.component';
import { ManagerOverTimePage } from './manager-over-time.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerOverTimePage,
    children: [
      {
        path: 'list',
        component: ListManagerOverTimesComponent,
      },
      {
        path: 'approve-overtime-request/:id',
        component: ApproveOverTimeRequestPage
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
export class ManagerOverTimeRoutingModule { }

