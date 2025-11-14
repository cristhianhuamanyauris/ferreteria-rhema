import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../../../core/services/supabase.client';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  email = '';
  password = '';
  nombre = '';
  apellido = '';
  mensaje = '';
  cargando = false;

  async registrar() {
    // Validaciones simples antes de llamar a Supabase
    if (!this.email || !this.password) {
      this.mensaje = '❌ Correo y contraseña son obligatorios.';
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    try {
      // 1️⃣ Crear usuario en Auth
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password
      });

      if (error) {
        this.mensaje = '❌ Error al crear cuenta: ' + error.message;
        return;
      }

      const uid = data.user?.id;
      if (!uid) {
        this.mensaje = '❌ No se obtuvo el ID del usuario creado.';
        return;
      }

      // 2️⃣ Registrar usuario en la tabla 'usuarios'
      const { error: insertError } = await supabase
        .from('usuarios')
        .insert({
          auth_uid: uid,
          correo: this.email,
          nombre_usuario: this.email,
          nombre: this.nombre,
          apellido: this.apellido,
          rol_id: null // Rol lo asignará un administrador desde su panel
        });

      if (insertError) {
        this.mensaje = '❌ Error guardando usuario en la BD: ' + insertError.message;
        return;
      }

      this.mensaje = '✅ Registro completado con éxito. Ahora puedes iniciar sesión.';

      // 👉 Opcional: limpiar campos
      this.email = '';
      this.password = '';
      this.nombre = '';
      this.apellido = '';

    } catch (e: any) {
      this.mensaje = '❌ Error inesperado: ' + e.message;
    } finally {
      this.cargando = false;
    }
  }
}
