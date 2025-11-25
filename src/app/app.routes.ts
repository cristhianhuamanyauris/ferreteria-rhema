/*
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { GestionUsuariosComponent } from './usuarios/gestion-usuarios/gestion-usuarios.component';

export const routes: Routes = [

  { 
    path: 'login',
    loadComponent: () => import('./auth/login/login.component')
      .then(m => m.LoginComponent)
  },

  { 
    path: 'registro',
    loadComponent: () => import('./auth/registro/registro.component')
      .then(m => m.RegistroComponent)
  },

  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./layout/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },

      {
        path: 'gestion-usuarios',
        component: GestionUsuariosComponent,
        canActivate: [RoleGuard],
        data: { rolesPermitidos: [1] }   // ADMIN = 1
      },

      {
        path: 'proveedores',
        loadComponent: () =>
          import('./inventario/proveedores/proveedores.component')
            .then(m => m.ProveedoresComponent)
      },

      // Ahora SÍ: dashboard para todos al entrar
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
*/

import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { GestionUsuariosComponent } from './usuarios/gestion-usuarios/gestion-usuarios.component';

export const routes: Routes = [

  { 
    path: 'login',
    loadComponent: () => import('./auth/login/login.component')
      .then(m => m.LoginComponent)
  },

  { 
    path: 'registro',
    loadComponent: () => import('./auth/registro/registro.component')
      .then(m => m.RegistroComponent)
  },

  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./layout/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },

      {
        path: 'gestion-usuarios',
        component: GestionUsuariosComponent,
        canActivate: [RoleGuard],
        data: { role: 1 }   // ADMIN = 1 (clave correcta)
      },

      {
        path: 'proveedores',
        loadComponent: () =>
          import('./inventario/proveedores/proveedores.component')
            .then(m => m.ProveedoresComponent)
      },

      // Vista inicial
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
