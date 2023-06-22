import { Tag, TagToDb } from '../Tag';
import { Tarea, TareaRequest } from './model';

export const destructureTarea = (tarea: Tarea, userId: number): TareaRequest => {
  const { compartida_con, responsable, tags, ...rest } = tarea;

  return {
    ...rest,
    responsable: responsable ? responsable.id : userId,
    compartida_con: compartida_con?.map((user) => user.id),
    creado_por: userId,
  };
};
