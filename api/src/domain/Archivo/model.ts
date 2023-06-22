import { Tarea } from '../Tarea';

export type Archivo = {
  id: number;
  nombre: string;
  tipo: string;
  ruta: string;
  meta: string;
  tarea: Tarea;
};

export type ArchivoStorage = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};
