import { Tag } from '../Tag';
import { Usuario } from '../Usuario';

export type Tarea = {
  id: number;
  titulo: string;
  descripcion: string;
  estatus: boolean | number;
  fecha_entrega: string;
  publica: string;
  comentarios?: string;
  creado_por: Usuario;
  responsable?: Usuario;
  compartida_con?: Usuario[];
  tags?: Tag[];
};

export type TareaRequest = Omit<
  Tarea,
  'id' | 'creado_por' | 'responsable' | 'compartida_con' | 'tags'
> & {
  responsable: number;
  compartida_con?: number[];
  creado_por: number;
};

export type TareaResponse = {
  tarea_id: number;
  responsable: number;
  creado_por: number;
  compartida_con?: number[];
  tags: number[];
};

export type UsuarioTarea = {
  usuario_id: number;
  tarea_id: number;
};
