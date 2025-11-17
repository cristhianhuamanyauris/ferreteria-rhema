import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      const session = await this.authService.getSession();

      if (!session?.user) {
        console.log('AuthGuard: No hay sesión, redirigiendo a login...');
        this.router.navigate(['/login']);
        return false;
      }

      console.log('AuthGuard: Usuario autenticado:', session.user.email);
      return true;
    } catch (err) {
      console.error('AuthGuard: error comprobando sesión ->', err);
      this.router.navigate(['/login']);
      return false;
    }
  }
}

