import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 IMPORTANTE
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      const roleId = await this.authService.getUserRole(); // number | null

      if (roleId === 1) { // 1 = Administrador
        this.router.navigate(['/gestion-usuarios']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      this.errorMsg = 'Error al iniciar sesión: ' + error.message;
    }
  }

}
