import { db } from '../../database';
import { Rol } from './model';

export class RolDbService {
  static async getById(id: number): Promise<Rol> {
    const rol = await db('roles').where({ id }).first();

    return rol;
  }
}
