import { Injectable } from '@angular/core';
import { SupabaseClient, Session, User } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { supabase } from './supabase.client'; // ✅ Usa el cliente global único

export interface Usuario {
  id_usuario: number;
  auth_uid: string;
  nombre_usuario: string;
  correo?: string;
  rol_id: number;
  nombre: string;
  apellido: string;
  roles?: { nombre_rol: string }[]; // ⚡ Ahora es array
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  private supabase: SupabaseClient = supabase;

  // 🟢 Iniciar sesión
  async login(email: string, password: string): Promise<{ user: User | null; session: Session | null }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    console.log('✅ Login exitoso:', data.user?.email, 'UID:', data.user?.id);
    return { user: data.user, session: data.session };
  }

  // 🟣 Registrar usuario
  async register(
    email: string,
    password: string,
    rolId: number,
    nombre: string,
    apellido: string
  ): Promise<{ user: User | null; session: Session | null }> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + '/login' }
    });
    if (error) throw error;

    const uid = data.user?.id;
    if (!uid) throw new Error('❌ No se pudo obtener el UID del usuario registrado');

    console.log('🆔 UID generado:', uid);

    // ⚠️ Evita guardar contraseñas en la BD (solo Supabase Auth debe tenerla)
    const { error: insertError } = await this.supabase.from('usuarios').insert({
      auth_uid: uid,
      nombre_usuario: email,
      correo: email,
      rol_id: rolId,
      nombre,
      apellido
    });

    if (insertError) {
      console.error('❌ Error al insertar usuario en tabla usuarios:', insertError);
    } else {
      console.log('✅ Usuario insertado correctamente en tabla usuarios');
    }

    return { user: data.user, session: data.session };
  }

  // 🔵 Obtener sesión actual
  async getSession(): Promise<Session | null> {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) console.error('❌ Error obteniendo sesión:', error);
    return data?.session || null;
  }

  // 🔴 Cerrar sesión
  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    localStorage.clear(); // ✅ Limpia posibles sesiones duplicadas
    this.router.navigate(['/login']);
  }

  // 🟠 Obtener perfil del usuario autenticado
  async getUserProfile(): Promise<Usuario | null> {
    const { data: authData, error: authError } = await this.supabase.auth.getUser();
    if (authError) {
      console.error('❌ Error al obtener usuario de Auth:', authError);
      return null;
    }

    const authUid = authData?.user?.id;
    if (!authUid) {
      console.warn('⚠️ No se obtuvo authUid del usuario autenticado');
      return null;
    }

    console.log('🧩 Buscando perfil para UID:', authUid);

    const { data, error, status } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('auth_uid', authUid)
      .maybeSingle();

    if (error) {
      console.error('❌ Error al obtener perfil:', error);
      return null;
    }

    if (!data) {
      console.warn('⚠️ No se encontró registro del usuario en la tabla usuarios');
      return null;
    }

    console.log('📄 Perfil obtenido:', data);
    return data as Usuario;
  }

  // 🧾 Obtener rol del usuario autenticado
  async getUserRole(): Promise<number | null> {
    const profile = await this.getUserProfile();
    console.log('🧾 Rol obtenido:', profile?.rol_id);
    return profile?.rol_id || null;
  }

  // 🟣 Obtener usuario autenticado directamente desde Auth
  // dentro de AuthService (reemplaza solo getUser si lo tienes)
  // 🟣 Obtener usuario autenticado directamente desde Auth (stable)
  async getUser(): Promise<{ user: User | null; error: any }> {
    // Usamos getSession() en vez de getUser() para evitar bloques por NavigatorLock
    try {
      const session = await this.getSession();
      return { user: session?.user || null, error: null };
    } catch (err) {
      // si algo falla, devolvemos el error
      return { user: null, error: err };
    }
  }

  async getUsuarioActual(): Promise<Usuario & { rol?: string } | null> {
    const session = await this.getSession();
    if (!session?.user) return null;

    const { data, error } = await supabase
      .from('usuarios')
      .select('id_usuario, nombre_usuario, auth_uid, rol_id, nombre, apellido, roles(nombre_rol)')
      .eq('auth_uid', session.user.id)
      .single();

    if (error || !data) return null;

    // ⚡ Accedemos al primer elemento del array de roles
    return {
      ...data,
      rol: data.roles?.[0]?.nombre_rol ?? null
    };
  }


}
