import { HttpStatusCodes } from '../../constants';
import { BaseError } from '../../utils';
import { UsuarioDbServices } from './db-services';
import { Usuario, UsuarioResponse } from './model';
import { UsuarioRepository } from './repository';

export class UsuarioServices implements UsuarioRepository {
  async getById(id: number): Promise<UsuarioResponse> {
    const user = await UsuarioDbServices.getById(id);

    if (!user) {
      throw new BaseError(HttpStatusCodes.NOT_FOUND, 'NOT FOUND', 'Usuario no encontrado.');
    }

    return user;
  }

  async findSharedList(list: number[]): Promise<UsuarioResponse[]> {
    const users = await UsuarioDbServices.findMultiplesUsersByIds(list);

    if (users.length !== list.length) {
      throw new BaseError(
        HttpStatusCodes.BAD_REQUEST,
        'BAD REQUEST',
        'Alguno de los usuarios no se ecnuentra dento de la lista de usuarios compartidos.'
      );
    }

    return users;
  }

  findUserInSharedList(userId: number, listId: number[]): number | undefined {
    const userExist = listId.find((user) => user === userId);

    return userExist;
  }
}
