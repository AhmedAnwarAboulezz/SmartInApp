import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLeavsListComponent } from './components';
import { LeavsListPage } from './leavs-list.page';

const routes: Routes = [
  {
    path: '',
    component: LeavsListPage,
    children: [
      {
        path: 'list',
        component: ListLeavsListComponent,
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
export class LeavsListPageRoutingModule {}
