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

export type TareaPaginacion = {
  page: number;
  per_page: number;
};

export type TareaListReq = TareaPaginacion & {
  clave: string;
  estatus: boolean | number;
  publica: string;
  dias_vencimiento: number;
  tipo_archivo: string;
};

export type TareaListRes = {
  total: number | string;
  tareas: Tarea[];
};

export type TareaResponseById = TareaResponse & {
  id: number;
  publica: string;
};

export type TareaActualizar = Omit<
  Tarea,
  'id' | 'creado_por' | 'responsable' | 'compartida_con' | 'estatus'
> & {
  responsable: number;
  compartida_con?: number[];
};
