import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';

import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // ⬇ Dashboard accesible para usuarios logueados
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  // ⬇ Gestión de Usuarios accesible solo para ADMIN
  { 
    path: 'gestion-usuarios',
    component: GestionUsuariosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { rolesPermitidos: ['Administrador'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
