import { Keys } from '../../constants';
import { db } from '../../database';
import {
  Tarea,
  TareaListReq,
  TareaListRes,
  TareaPaginacion,
  TareaRequest,
  TareaResponse,
  UsuarioTarea,
} from './model';

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

  static async getAllPublic(filter: TareaPaginacion): Promise<TareaListRes> {
    const query = db('tareas').where({ publica: Keys.privacyStatus.public });

    query.limit(filter.per_page ?? 10);

    if (filter.page) {
      query.offset((filter.page - 1) * (filter.per_page ?? 10));
    }
    const tareas = await query;

    //realizar un count de las tareas
    const total = await db('tareas').count('id').where({ publica: Keys.privacyStatus.public });

    return {
      total: total[0].count,
      tareas,
    };
  }

  static async getAll(filter: TareaListReq): Promise<TareaListRes> {
    const query = db('tareas').where((builder) => {
      if (filter.clave) {
        builder.where('titulo', 'like', `%${filter.clave}%`);
        builder.orWhere('descripcion', 'like', `%${filter.clave}%`);
      }
      if (filter.estatus) {
        builder.where({ estatus: filter.estatus });
      }
      if (filter.publica) {
        builder.where({ publica: filter.publica });
      }
      if (filter.total_compartidos) {
        //El valor de total_compartidos es el count de los usuarios compartidos con la tarea
        builder.whereExists(function () {
          this.select('*')
            .from('tareas_usuarios')
            .whereRaw('tareas_usuarios.tarea_id = tareas.id')
            .count('*');
        });
      }
      if (filter.dias_vencimiento) {
        //Los dias de vencimiento son los dias que faltan para que se venza la tarea sobre el valor de tipo date fecha_entrega
        builder.whereRaw(`DATEDIFF(fecha_entrega, CURDATE()) = ${filter.dias_vencimiento}`);
      }

      if (filter.tipo_archivo) {
        //Este filtro es para buscar por el tipo de archivo que se va a subir sobre la tabla "archivos"
        builder.whereExists(function () {
          this.select('*')
            .from('archivos')
            .whereRaw('archivos.tarea_id = tareas.id')
            .where({ tipo_archivo: filter.tipo_archivo });
        });
      }
    });

    query.limit(filter.per_page ?? 10);

    if (filter.page) {
      query.offset((filter.page - 1) * (filter.per_page ?? 10));
    }
    const tareas = await query;

    //realizar un count de las tareas
    const total = await db('tareas').count('id');

    return {
      total: total[0]['count(`id`)'],
      tareas,
    };
  }
}
