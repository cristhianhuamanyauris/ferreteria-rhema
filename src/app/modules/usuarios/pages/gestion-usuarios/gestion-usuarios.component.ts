import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { supabase } from '../../../../core/services/supabase.client'; // ✅ cliente global

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  roles: any[] = [];
  errorMsg = '';

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.cargarUsuarios();
    await this.cargarRoles();
  }

  // 🟢 Obtener todos los usuarios con su rol
  async cargarUsuarios() {
    const { data, error } = await supabase
      .from('usuarios')
      .select(`
        id_usuario,
        nombre,
        apellido,
        nombre_usuario,
        correo,
        rol_id,
        roles!usuarios_rol_id_fkey (
          id,
          nombre_rol
        )
      `)
      .order('id_usuario', { ascending: true });

    if (error) {
      this.errorMsg = 'Error al cargar usuarios';
      console.error('❌ Error al obtener usuarios:', error);
    } else {
      console.log('✅ Usuarios cargados correctamente:', data);
      this.usuarios = data;
    }
  }


  // 🟣 Obtener lista de roles
  async cargarRoles() {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('❌ Error al cargar roles:', error);
    } else {
      this.roles = data;
      console.log('✅ Roles cargados:', data);
    }
  }

  // 🔵 Cambiar el rol de un usuario
  async actualizarRol(usuario: any) {
    const { error } = await supabase
      .from('usuarios')
      .update({ rol_id: usuario.rol_id })
      .eq('id_usuario', usuario.id_usuario);

    if (error) {
      alert('❌ Error al actualizar rol');
      console.error(error);
    } else {
      alert('✅ Rol actualizado correctamente');
      await this.cargarUsuarios();
    }
  }
}
