import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainInquiryPage } from './main-inquiry.page';

const routes: Routes = [
  {
    path: '',
    component: MainInquiryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainInquiryPageRoutingModule {}
