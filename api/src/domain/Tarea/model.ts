import { Usuario } from '../Usuario';

export type Tarea = {
  id: number;
  titulo: string;
  descripcion: string;
  estatus: boolean | number;
  fecha_entrega: string;
  publica: string;
  comentarios: string;
  creado_por: Usuario;
  responsable: Usuario;
  compartida_con: Usuario[];
};
