import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthBackgroundComponent } from '../auth-background.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AuthBackgroundComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth-layout.styles.css']
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
      // 🔐 1. Autenticar con Supabase
      await this.authService.login(this.email, this.password);

      // 🔍 2. Obtener rol
      const roleId = await this.authService.getUserRole();

      // 🔀 3. Redirigir a la raíz → dashboard layout toma el control
      this.router.navigate(['/']);

    } catch (error: any) {
      this.errorMsg = error?.message || 'Error al iniciar sesión.';
    } finally {
      this.loading = false;
    }
  }
}
