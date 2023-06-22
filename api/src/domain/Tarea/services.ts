import { HttpStatusCodes, Keys } from '../../constants';
import { BaseError } from '../../utils';
import { RolServices } from '../Rol/service';
import { TagServices } from '../Tag';
import { UsuarioResponse, UsuarioServices } from '../Usuario';
import { TareaDbServices } from './db-services';
import {
  Tarea,
  TareaActualizar,
  TareaListReq,
  TareaListRes,
  TareaRequest,
  TareaResponse,
  TareaResponseById,
} from './model';
import { TareaRepository } from './repository';
import { destructureTarea } from './utils';

const usuarioServices = new UsuarioServices();
const tagsServices = new TagServices();

export class TareaServices implements TareaRepository {
  async create(tarea: Tarea, userId: number): Promise<TareaResponse> {
    const tareaDestructure = destructureTarea(tarea, userId);

    let sharedUsers: UsuarioResponse[] = [];
    let responsable: number | undefined;
    if (tareaDestructure.compartida_con) {
      sharedUsers = await usuarioServices.findSharedList(tareaDestructure.compartida_con);

      responsable = await usuarioServices.findUserInSharedList(
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

  async remove(tareaId: number, userId: number): Promise<void> {
    const task = await TareaDbServices.getById(tareaId);

    if (task.publica !== Keys.privacyStatus.public) {
      await this.verifySharedUser(userId, tareaId);
    }

    await TareaDbServices.remove(tareaId);
  }

  async update(tareaId: number, tarea: TareaActualizar, userId: number): Promise<any> {
    const task = await TareaDbServices.getById(tareaId);

    if (task.publica !== Keys.privacyStatus.public) {
      await this.verifySharedUser(userId, tareaId);
    }

    const { tags, ...tareaData } = tarea;

    const tareaUpdated = await TareaDbServices.update(tareaId, tareaData);

    if (tarea.compartida_con) {
      await Promise.all([
        TareaDbServices.deleteLinks(tareaId, tarea.compartida_con),
        TareaDbServices.linkTaskWithUsers(tareaUpdated, tarea.compartida_con),
      ]);
    }

    if (tags) {
      await Promise.all([
        tagsServices.removeTags(tareaUpdated),
        tagsServices.create(tags, tareaUpdated),
      ]);
    }

    return {
      tarea_id: tareaUpdated,
      responsable: tareaData.responsable,
      creado_por: userId,
      compartida_con: tareaData.compartida_con,
    };
  }

  async getAll(filter: TareaListReq, userId: number): Promise<TareaListRes> {
    const rol = await usuarioServices.getRol(userId);

    if (rol.rol_nombre === Keys.roles.admin) {
      const tareas = await TareaDbServices.getAll(filter);

      return tareas;
    }
    return await TareaDbServices.getAllPublic(filter);
  }

  async getById(id: number, userId: number): Promise<Tarea | TareaResponseById> {
    const tarea = await TareaDbServices.getById(id);

    if (!tarea) {
      throw new BaseError(HttpStatusCodes.NOT_FOUND, 'NOT_FOUND', 'Tarea no encontrada.');
    }

    await this.verifySharedUser(userId, id);

    return tarea;
  }

  async verifySharedUser(userId: number, tareaId: number): Promise<void> {
    const task = await TareaDbServices.getById(tareaId);

    if (!task) {
      throw new BaseError(HttpStatusCodes.NOT_FOUND, 'NOT_FOUND', 'Tarea no encontrada.');
    }

    const sharedUser = await TareaDbServices.findSharedUser(userId, tareaId);
    //validar si el usuario es el creador de la tarea o si es el respponsable o si se le compartio la tarea

    if (task.creado_por !== userId && task.responsable !== userId && !sharedUser) {
      throw new BaseError(
        HttpStatusCodes.FORBIDDEN,
        'FORBIDDEN',
        'No tienes permiso para acceder a esta tarea.'
      );
    }
  }

  async complete(tareaId: number, userId: number): Promise<void> {
    const task = await TareaDbServices.getById(tareaId);

    if (task.publica !== Keys.privacyStatus.public) {
      await this.verifySharedUser(userId, tareaId);
    }

    await TareaDbServices.complete(tareaId);
  }
}
