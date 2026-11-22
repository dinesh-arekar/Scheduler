import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  // Public pages: main layout ke bahar
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login)
  },

  // Main layout: authenticated application structure
  {
    path: '',
    canActivate:[authGuard],
    loadComponent: () =>
      import('./layouts/main-layout/main-layout')
        .then(m => m.MainLayout),

    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard')
            .then(m => m.Dashboard)
      },
      {
        path: 'accounts',
        loadComponent: () =>
          import('./pages/accounts/accounts')
            .then(m => m.Accounts)
      },
      {
        path: 'schedule',
        loadComponent: () =>
          import('./pages/schedule/schedule')
            .then(m => m.Schedule)
      },
      {
        path: 'ai-composer',
        loadComponent: () =>
          import('./pages/ai-composer/ai-composer')
            .then(m => m.AiComposer)
      }
    ]
  },
];