import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('@/pages/login/component/login.component').then(m => m.LoginComponent) },
  { path: 'user', loadComponent: () => import('@/pages/users/users.component').then(m => m.UsersComponent) },
  { path: ':lang', children: [
    { path: '', loadComponent: () => import('@/pages/login/component/login.component').then(m => m.LoginComponent) },
  ] },
];
