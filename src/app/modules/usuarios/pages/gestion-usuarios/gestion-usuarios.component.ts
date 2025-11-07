import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Usuario } from '../../../../core/services/auth.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  private supabase: SupabaseClient;
  usuarios: any[] = [];
  roles: any[] = [];
  errorMsg = '';

  constructor(private authService: AuthService) {
    this.supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
  }

  async ngOnInit() {
    await this.cargarUsuarios();
    await this.cargarRoles();
  }

  // 🟢 Obtener todos los usuarios con su rol
  async cargarUsuarios() {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('id_usuario, nombre, apellido, nombre_usuario, correo, rol_id, roles(nombre_rol)')
      .order('id_usuario', { ascending: true });

    if (error) {
      this.errorMsg = 'Error al cargar usuarios';
      console.error(error);
    } else {
      this.usuarios = data;
    }
  }

  // 🟣 Obtener lista de roles disponibles
  async cargarRoles() {
    const { data, error } = await this.supabase
      .from('roles')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error(error);
    } else {
      this.roles = data;
    }
  }

  // 🔵 Cambiar el rol de un usuario
  async actualizarRol(usuario: any) {
    const { error } = await this.supabase
      .from('usuarios')
      .update({ rol_id: usuario.rol_id })
      .eq('id_usuario', usuario.id_usuario);

    if (error) {
      alert('Error al actualizar rol');
      console.error(error);
    } else {
      alert('Rol actualizado correctamente');
      await this.cargarUsuarios();
    }
  }
}
