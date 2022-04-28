import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'initial',
    pathMatch: 'full'
  },
  {
    path: 'initial',
    loadChildren: () => import('./pages/initialize/initialize.module').then(m => m.InitializeModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('./pages/organization/organization.module').then((m) => m.OrganizationPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'reset',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  // {
  //   path: 'sign',
  //   loadChildren: () => import('./pages/sign/sign/sign.module').then( m => m.SignPageModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'organization',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
