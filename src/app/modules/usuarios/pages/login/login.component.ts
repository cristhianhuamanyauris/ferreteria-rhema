import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // 👈 IMPORTANTE
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    this.errorMsg = '';
    this.loading = true;

    try {
      // 🔐 1. Autenticar en Supabase
      await this.authService.login(this.email, this.password);

      // 🔍 2. Obtener el rol desde tabla usuarios
      const roleId = await this.authService.getUserRole();

      // 🔀 3. Redirigir según rol
      if (roleId === 1) {
        this.router.navigate(['/gestion-usuarios']);  // Administrador
      } else {
        this.router.navigate(['/dashboard']);         // Usuario normal
      }

    } catch (error: any) {
      this.errorMsg = error?.message || 'Error al iniciar sesión.';
    } finally {
      this.loading = false;
    }
  }
}
