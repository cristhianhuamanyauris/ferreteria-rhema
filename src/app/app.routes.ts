import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { DashboardComponent } from './modules/usuarios/pages/dashboard/dashboard.component';
import { GestionUsuariosComponent } from './modules/usuarios/pages/gestion-usuarios/gestion-usuarios.component';

export const routes: Routes = [
  // 🟢 Página de login
  { 
    path: 'login', 
    loadComponent: () => import('./modules/usuarios/pages/login/login.component')
      .then(m => m.LoginComponent) 
  },

  // 🟣 Dashboard protegido por autenticación
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },

  // 🔴 Gestión de usuarios: protegida por rol (solo admin, por ejemplo)
  { 
    path: 'gestion-usuarios', 
    component: GestionUsuariosComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 1 }  // Solo permite rol con id = 1 (admin)
  },

  // 🟠 Ruta por defecto o redirección
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // ⚫ Página de error o no autorizado
  { 
    path: 'unauthorized', 
    loadComponent: () => import('./modules/shared/components/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent) 
  },

  // ⚫ Si la ruta no existe
  { path: '**', redirectTo: '/login' }
];
