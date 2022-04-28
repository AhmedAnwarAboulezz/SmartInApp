import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardManager, AuthGuardManagerOrTeam } from 'src/app/core/services/guards/authguard.guard';
import { SignPage } from '../sign/sign/sign.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'attendance',
        loadChildren: () =>
          import('../attendance-list/attendance-list.module').then(
            (m) => m.AttendanceListPageModule
          ),
      },
      {
        path: 'myRequests',
        loadChildren: () =>
          import('../my-requests/my-requests.module').then(
            (m) => m.MyRequestsPageModule
          ),
      },
      {
        path: 'inquiry',
        loadChildren: () =>
          import('../inquiry/inquiry.module').then((m) => m.InquiryModule),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('../departments/departments.module').then(
            (m) => m.DepartmentsPageModule
          ),
          canActivate:[AuthGuardManager],
          canActivateChild : [AuthGuardManager]
      },
      {
        path: 'requests',
        loadChildren: () =>
          import('../requests/requests.module').then(
            (m) => m.RequestsPageModule
          ),
          canActivate:[AuthGuardManagerOrTeam],
          canActivateChild : [AuthGuardManagerOrTeam]
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('../notifications/notifications.module').then(
            (m) => m.NotificationsPageModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserPageModule),
      },
      {
        path: 'sign',
        loadChildren: () => import('../sign/sign/sign.module').then( m => m.SignPageModule)
      },
      // {
      //   path: 'sign',
      //   component: SignPage,
      // },
      {
        path: '',
        redirectTo: 'inquiry',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
