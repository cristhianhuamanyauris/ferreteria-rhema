/*
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

import { DashboardLayoutComponent } from '../../layout/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard-layout/dashboard/dashboard.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';

import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  {
    path: '',     // ⬅️ RUTA PADRE
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],  // ⬅️ protege TODO el layout
    children: [
      { path: 'dashboard', component: DashboardComponent },

      {
        path: 'gestion-usuarios',
        component: GestionUsuariosComponent,
        canActivate: [RoleGuard],
        data: { rolesPermitidos: ['Administrador'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
*/