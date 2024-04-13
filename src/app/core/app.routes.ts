import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
  { path: '', loadComponent: () => import('@/features/pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('@/features/pages/register/register.component').then(m => m.RegisterComponent), canMatch: [authGuard] },
  { path: ':lang', children: [
    { path: '', loadComponent: () => import('@/features/pages/login/login.component').then(m => m.LoginComponent),
     },
  ] },
];
