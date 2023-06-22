import { db } from '../../database';
import { Tarea, TareaRequest, TareaResponse, UsuarioTarea } from './model';

export class TareaDbServices {
  static async create(
    tarea: TareaRequest,
    responsable: number,
    createdBy: number
  ): Promise<number> {
    const { compartida_con, ...tareaData } = tarea;

    const tareaCrated = await db('tareas')
      .insert({ ...tareaData, estatus: false, responsable, creado_por: createdBy })
      .returning('*');
    return tareaCrated[0];
  }

  static async linkTaskWithUsers(tareaId: number, userIds: number[]): Promise<void> {
    const links = userIds.map((userId) => ({ tarea_id: tareaId, usuario_id: userId }));

    await db('tareas_usuarios').insert(links);
  }

  static async remove(taskId: number): Promise<void> {
    await db('tareas').where({ id: taskId }).del();
  }

  static async getById(taskId: number): Promise<TareaResponse> {
    const tarea = await db('tareas').where({ id: taskId }).first();

    return tarea;
  }

  static async findSharedUser(userId: number, taskId: number): Promise<UsuarioTarea> {
    const user = await db('tareas_usuarios')
      .where({ usuario_id: userId, tarea_id: taskId })
      .first();

    return user;
  }
}
