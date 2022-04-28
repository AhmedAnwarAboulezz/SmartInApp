import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOverTimeComponent, ListOverTimeComponent } from './components';
import { OverTimeRequestDetailsComponent } from './components/overtime-request-details/overtime-request-details.component';
import { OverTimePage } from './over-time.page';

const routes: Routes = [
  {
    path: '',
    component: OverTimePage,
    children: [
      {
        path: 'list',
        component: ListOverTimeComponent,
      },
      {
        path: 'add',
        component: AddOverTimeComponent,
      },
      {
        path: 'edit/:id',
        component: AddOverTimeComponent,
      },
      {
        path: 'overtime-request-details/:id',
        component: OverTimeRequestDetailsComponent
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
export class OverTimePageRoutingModule {}
