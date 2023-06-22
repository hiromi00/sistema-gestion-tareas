import { HttpStatusCodes } from '../../constants';
import { BaseError } from '../../utils';
import { TagServices } from '../Tag';
import { UsuarioResponse, UsuarioServices } from '../Usuario';
import { TareaDbServices } from './db-services';
import { Tarea, TareaRequest, TareaResponse } from './model';
import { TareaRepository } from './repository';
import { destructureTarea } from './utils';

const userServices = new UsuarioServices();
const tagsServices = new TagServices();

export class TareaServices implements TareaRepository {
  async create(tarea: Tarea, userId: number): Promise<TareaResponse> {
    const tareaDestructure = destructureTarea(tarea, userId);

    let sharedUsers: UsuarioResponse[] = [];
    let responsable: number | undefined;
    if (tareaDestructure.compartida_con) {
      console.log('tareaDestructure.compartida_con ---> ', tareaDestructure.compartida_con);

      sharedUsers = await userServices.findSharedList(tareaDestructure.compartida_con);

      responsable = await userServices.findUserInSharedList(
        tareaDestructure.responsable,
        tareaDestructure.compartida_con
      );
    }

    if (!responsable) {
      // El usuario que crea la tarea es el responsable por defecto
      responsable = userId;
    }

    const newTarea = await TareaDbServices.create(tareaDestructure, responsable, userId);

    if (sharedUsers.length) {
      await TareaDbServices.linkTaskWithUsers(
        newTarea,
        sharedUsers.map((user) => user.id)
      );
    }
    let tags: number[] = [];
    if (tarea.tags) {
      tags = await tagsServices.create(tarea.tags, newTarea);
    }
    return {
      tarea_id: newTarea,
      responsable: responsable,
      creado_por: userId,
      compartida_con: tareaDestructure.compartida_con,
      tags: tags,
    };
  }
}
