import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const requiredRole = route.data['role'];

    // 1️⃣ Obtener usuario autenticado
    const { user, error } = await this.authService.getUser();
    if (error || !user) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2️⃣ Obtener perfil desde tabla usuarios
    const userProfile = await this.authService.getUserProfile();
    if (!userProfile) {
      this.router.navigate(['/login']);
      return false;
    }

    // 3️⃣ Validar rol
    if (userProfile.rol_id !== requiredRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
