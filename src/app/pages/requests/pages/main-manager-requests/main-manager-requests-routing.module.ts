import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainManagerRequestsPage } from './main-manager-requests.page';

const routes: Routes = [
  {
    path: '',
    component: MainManagerRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainManagerRequestsPageRoutingModule {}
