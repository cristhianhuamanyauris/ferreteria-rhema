  import { Routes } from '@angular/router';
  import { AuthGuard } from './core/guards/auth.guard';
  import { RoleGuard } from './core/guards/role.guard';
  import { DashboardComponent } from './modules/usuarios/pages/dashboard-layout/dashboard/dashboard.component';
  import { GestionUsuariosComponent } from './modules/usuarios/pages/dashboard-layout/gestion-usuarios/gestion-usuarios.component';
  import { DashboardLayoutComponent } from './modules/usuarios/pages/dashboard-layout/dashboard-layout.component';


  export const routes: Routes = [
    // 🟢 Página de login
    { 
      path: 'login', 
      loadComponent: () => import('./modules/usuarios/pages/login/login.component')
        .then(m => m.LoginComponent) 
    },
      // 🟢 Página de registro
    { 
      path: 'registro', 
      loadComponent: () => import('./modules/usuarios/pages/registro/registro.component')
        .then(m => m.RegistroComponent) 
    },

  // 🟣 TODAS LAS RUTAS DEL DASHBOARD VAN AQUÍ
  {
    path: '',
    component: DashboardLayoutComponent,  // ← layout con sidebar
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'gestion-usuarios',
        component: GestionUsuariosComponent,
        canActivate: [RoleGuard],
        data: { role: 1 }
      },
      {
        path: 'proveedores',
        loadComponent: () =>
          import('./modules/inventario/proveedores/proveedores.component')
            .then(m => m.ProveedoresComponent)
      },
    ]
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
