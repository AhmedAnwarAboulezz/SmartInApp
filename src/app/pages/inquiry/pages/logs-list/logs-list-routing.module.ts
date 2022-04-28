import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLogsListComponent } from './components/list-logs-list/list-logs-list.component';
import { LogsListPage } from './logs-list.page';

const routes: Routes = [
  {
    path: '',
    component: LogsListPage,
    children: [
      {
        path: 'list',
        component: ListLogsListComponent,
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
export class LogsListPageRoutingModule {}
