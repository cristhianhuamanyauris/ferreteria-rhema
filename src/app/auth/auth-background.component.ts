import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-background',
  standalone: true,
  template: `
    <svg
      class="fondo-ondas"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradAzul" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#22d3ee" />
          <stop offset="100%" stop-color="#2563eb" />
        </linearGradient>
      </defs>

      <!-- fondo blanco -->
      <rect width="1000" height="600" fill="#ffffff" />

      <!-- LADO AZUL CON ONDA -->
      <path
        d="M 0 0 L 450 0 C 470 100, 470 200, 400 350 C 380 400, 340 500, 400 600 L 0 600 Z"
        fill="url(#gradAzul)"
      />
    </svg>
  `,
  styles: [`
    :host {
      position: absolute;
      inset: 0;
      z-index: 0;
      display: block;
    }

    .fondo-ondas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class AuthBackgroundComponent {}
