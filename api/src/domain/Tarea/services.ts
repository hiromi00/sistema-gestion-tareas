import { HttpStatusCodes } from '../../constants';
import { BaseError } from '../../utils';
import { UsuarioServices } from '../Usuario';
import { TareaDbServices } from './db-services';
import { Tarea, TareaRequest } from './model';
import { TareaRepository } from './repository';

const userServices = new UsuarioServices();

export class TareaServices implements TareaRepository {
  async create(tarea: TareaRequest, userId: number): Promise<number> {
    let sharedUsers: any[] = [];
    let responsable = null;
    if (tarea.compartida_con) {
      sharedUsers = await userServices.findSharedList(tarea.compartida_con);
      responsable = await userServices.findUserInSharedList(
        tarea.responsable,
        tarea.compartida_con
      );
    }

    if (!responsable) {
      // El usuario que crea la tarea es el responsable por defecto
      responsable = userId;
    }

    const newTarea = await TareaDbServices.create(tarea, responsable);

    if (sharedUsers.length) {
      await TareaDbServices.linkTaskWithUsers(
        newTarea,
        sharedUsers.map((user) => user.id)
      );
    }
    return newTarea;
  }
}
