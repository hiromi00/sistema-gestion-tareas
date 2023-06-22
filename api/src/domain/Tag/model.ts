import { Tarea } from '../Tarea';

export type Tag = {
  id: number;
  nombre: string;
  tarea: Tarea;
};

export type TagToDb = Omit<Tag, 'tarea'> & {
  tarea_id: number;
};
