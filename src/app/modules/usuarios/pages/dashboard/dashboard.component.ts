import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true, // 👈 Se declara standalone
  imports: [CommonModule, RouterModule], // 👈 Importa módulos que necesita el template
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario: any = null;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    const data = await this.auth.getUsuarioActual();
    if (data) {
      this.usuario = {
        ...data,
        rol: data.roles?.[0]?.nombre_rol ?? null // ⚡ accedemos directamente, no como array
      };
    }
    console.log("Usuario en dashboard:", this.usuario);
  }


  logout() {
    this.auth.logout();
  }
}
