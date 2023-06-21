import { Tarea } from '../Tarea';

export type Archivo = {
  id: number;
  nombre: string;
  tipo: string;
  ruta: string;
  meta: string;
  tarea: Tarea;
};
