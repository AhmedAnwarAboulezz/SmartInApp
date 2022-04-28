import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLatesListComponent } from './components';
import { LatesListPage } from './lates-list.page';

const routes: Routes = [
  {
    path: '',
    component: LatesListPage,
    children: [
      {
        path: 'list',
        component: ListLatesListComponent,
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
export class LatesListPageRoutingModule {}
