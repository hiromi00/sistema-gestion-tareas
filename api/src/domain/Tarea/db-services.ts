import { db } from '../../database';
import { Tarea, TareaRequest } from './model';

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
}
