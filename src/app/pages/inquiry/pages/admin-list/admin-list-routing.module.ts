import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAdminListComponent } from './components';
import { AdminListPage } from './admin-list.page';

const routes: Routes = [
  {
    path: '',
    component: AdminListPage,
    children: [
      {
        path: 'list',
        component: ListAdminListComponent,
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
export class AdminListPageRoutingModule {}
