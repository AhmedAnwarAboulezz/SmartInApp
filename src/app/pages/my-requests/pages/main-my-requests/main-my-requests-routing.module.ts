import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainMyRequestsPage } from './main-my-requests.page';

const routes: Routes = [
  {
    path: '',
    component: MainMyRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMyRequestsPageRoutingModule {}
