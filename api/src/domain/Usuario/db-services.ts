import { db } from '../../database';
import { UsuarioResponse } from './model';

export class UsuarioDbServices {
  static async getById(id: number): Promise<UsuarioResponse> {
    const user = await db('usuarios').select('id', 'email', 'rol_id').where({ id }).first();

    return user;
  }

  static async findMultiplesUsersByIds(ids: number[]): Promise<UsuarioResponse[]> {
    const users = await db('usuarios').select('id', 'email', 'rol_id').whereIn('id', ids);

    return users;
  }
}
