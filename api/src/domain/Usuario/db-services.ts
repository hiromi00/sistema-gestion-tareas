import { db } from '../../database';
import { Usuario, UsuarioResponse, UsuarioRol } from './model';

export class UsuarioDbServices {
  static async getById(id: number): Promise<UsuarioResponse> {
    const user = await db('usuarios').select('id', 'email', 'rol_id').where({ id }).first();

    return user;
  }

  static async findMultiplesUsersByIds(ids: number[]): Promise<UsuarioResponse[]> {
    const users = await db('usuarios').select('id', 'email', 'rol_id').whereIn('id', ids);

    return users;
  }

  static async findByEmail(email: string): Promise<Usuario> {
    const user = await db('usuarios').select('id', 'email', 'password').where({ email }).first();

    return user;
  }

  static async getRol(userId: number): Promise<UsuarioRol> {
    const rol = await db('usuarios')
      .select('rol.id as rol_id', 'rol.nombre as rol_nombre')
      .join('roles as rol', 'usuarios.rol_id', 'rol.id')
      .where('usuarios.id', userId)
      .first();

    return rol;
  }
}
