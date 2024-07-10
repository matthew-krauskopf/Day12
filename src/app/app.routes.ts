import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'properties',
        component: PropertyListComponent,
      },
      {
        path: 'properties/:id',
        component: PropertyDetailComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
