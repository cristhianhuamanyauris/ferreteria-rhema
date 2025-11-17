import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  usuario: any = null;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    const data = await this.auth.getUsuarioActual();

    if (data) {
      this.usuario = {
        ...data,
        rol: data.roles?.[0]?.nombre_rol ?? null,
        
      };
    }

    console.log("Usuario en layout:", this.usuario);
  }

  logout() {
    this.auth.logout();
  }
}
