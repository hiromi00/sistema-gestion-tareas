import { HttpStatusCodes } from '../../constants';
import { BaseError } from '../../utils';
import { RolDbService } from './db-services';
import { Rol } from './model';
import { RolRepository } from './repository';

export class RolServices implements RolRepository {
  async getById(id: number): Promise<Rol> {
    const rol = await RolDbService.getById(id);

    if (!rol) {
      throw new BaseError(
        HttpStatusCodes.BAD_REQUEST,
        'BAD REQUEST',
        'El rol no se encuentra registrado.'
      );
    }
    return rol;
  }
}
