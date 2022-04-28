import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLiveLogsListComponent } from './components';
import { LiveLogsListPage } from './live-logs-list.page';

const routes: Routes = [
  {
    path: '',
    component: LiveLogsListPage,
    children: [
      {
        path: 'list',
        component: ListLiveLogsListComponent,
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
export class LiveLogsListPageRoutingModule {}
