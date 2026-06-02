
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/users/components/users-dashboard/users-dashboard').then(m => m.UsersDashboardComponent)
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'dashboard'
  }
];
