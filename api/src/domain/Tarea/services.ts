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

  async remove(taskId: number, userId: number) {
    await this.verifySharedUser(userId, taskId);

    await TareaDbServices.remove(taskId);
  }

  async update() {
    throw new BaseError(HttpStatusCodes.NOT_IMPLEMENTED, 'NOT_IMPLEMENTED', 'Not implemented yet.');
  }

  async getAll(userId: number): Promise<TareaResponse[]> {
    throw new BaseError(HttpStatusCodes.NOT_IMPLEMENTED, 'NOT_IMPLEMENTED', 'Not implemented yet.');
  }

  async getById(id: number, userId: number): Promise<TareaResponse> {
    throw new BaseError(HttpStatusCodes.NOT_IMPLEMENTED, 'NOT_IMPLEMENTED', 'Not implemented yet.');
  }

  async verifySharedUser(userId: number, taskId: number): Promise<void> {
    const task = await TareaDbServices.getById(taskId);

    if (!task) {
      throw new BaseError(HttpStatusCodes.NOT_FOUND, 'NOT_FOUND', 'Tarea no encontrada.');
    }

    const sharedUser = await TareaDbServices.findSharedUser(userId, taskId);
    //validar si el usuario es el creador de la tarea o si es el respponsable o si se le compartio la tarea

    if (task.creado_por !== userId && task.responsable !== userId && !sharedUser) {
      throw new BaseError(
        HttpStatusCodes.FORBIDDEN,
        'FORBIDDEN',
        'No tienes permiso para acceder a esta tarea.'
      );
    }
  }
}
