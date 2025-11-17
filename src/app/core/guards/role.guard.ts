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
    const requiredRole = route.data['role']; // este es un número en tus rutas (ej. 1)

    try {
      // 1️⃣ Comprobamos sesión primero (robusto)
      const session = await this.authService.getSession();
      if (!session?.user) {
        console.log('RoleGuard: no hay sesión -> login');
        this.router.navigate(['/login']);
        return false;
      }

      // 2️⃣ Obtenemos el perfil completo (usa getUsuarioActual que ya trae rol_id)
      const usuarioActual: any = await this.authService.getUsuarioActual();
      if (!usuarioActual) {
        console.log('RoleGuard: no se obtuvo perfil en tabla usuarios -> login');
        this.router.navigate(['/login']);
        return false;
      }

      // 3️⃣ Validamos rol por rol_id (numérico)
      if (usuarioActual.rol_id !== requiredRole) {
        console.log(`RoleGuard: rol insuficiente (esperado ${requiredRole}, encontrado ${usuarioActual.rol_id}) -> unauthorized`);
        this.router.navigate(['/unauthorized']);
        return false;
      }

      // ✅ autorizado
      return true;

    } catch (err) {
      console.error('RoleGuard: error validando rol ->', err);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
