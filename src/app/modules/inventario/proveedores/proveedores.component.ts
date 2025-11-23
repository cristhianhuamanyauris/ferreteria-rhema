import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Proveedor {
  id?: number;        // se mapeará a id_proveedor en la BD
  nombre: string;
  contacto?: string;
  telefono?: string;
  direccion?: string;
}

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  // buscador
  terminoBusqueda = '';

  // lista de proveedores ejemplo 
  proveedores: Proveedor[] = [
    {
      id: 1,
      nombre: 'Ferremax S.A.C.',
      contacto: 'Juan Pérez',
      telefono: '987654321',
      direccion: 'Av. Principal 123'
    },
    {
      id: 2,
      nombre: 'Aceros Andinos',
      contacto: 'María López',
      telefono: '912345678',
      direccion: 'Jr. Industrial 456'
    }
  ];

  //  estado del formulario
  proveedorActual: Proveedor = this.nuevoProveedor();
  editando = false;

  //  crea un proveedor vacío
  nuevoProveedor(): Proveedor {
    return {
      nombre: '',
      contacto: '',
      telefono: '',
      direccion: ''
    };
  }

  // limpiar formulario para nuevo proveedor
  nuevo() {
    this.editando = false;
    this.proveedorActual = this.nuevoProveedor();
  }

  // cargar datos en el formulario para editar
  editar(proveedor: Proveedor) {
    this.editando = true;
    this.proveedorActual = { ...proveedor };
  }

  // eliminar proveedor de la lista (por ahora solo front)
  eliminar(proveedor: Proveedor) {
    const ok = confirm(`¿Eliminar proveedor "${proveedor.nombre}"?`);
    if (!ok) return;
    this.proveedores = this.proveedores.filter(p => p.id !== proveedor.id);
    if (this.editando && this.proveedorActual.id === proveedor.id) {
      this.nuevo();
    }
  }

  // guardar o actualizar
  guardar() {
    if (!this.proveedorActual.nombre.trim()) {
      return;
    }

    if (this.editando && this.proveedorActual.id != null) {
      // actualizar
      this.proveedores = this.proveedores.map(p =>
        p.id === this.proveedorActual.id ? { ...this.proveedorActual } : p
      );
    } else {
      // crear nuevo (id temporal)
      const nuevoId =
        this.proveedores.length > 0
          ? Math.max(...this.proveedores.map(p => p.id || 0)) + 1
          : 1;

      const nuevo: Proveedor = {
        ...this.proveedorActual,
        id: nuevoId
      };

      this.proveedores = [nuevo, ...this.proveedores];
    }

    this.nuevo();
  }

  // lista filtrada por nombre, contacto, teléfono o dirección
  get proveedoresFiltrados(): Proveedor[] {
    const t = this.terminoBusqueda.trim().toLowerCase();
    if (!t) return this.proveedores;

    return this.proveedores.filter(p =>
      (p.nombre || '').toLowerCase().includes(t) ||
      (p.contacto || '').toLowerCase().includes(t) ||
      (p.telefono || '').toLowerCase().includes(t) ||
      (p.direccion || '').toLowerCase().includes(t)
    );
  }
}
