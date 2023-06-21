import { Rol } from '../Rol';

export type Usuario = {
  id: number;
  email: string;
  password?: string;
  rol: Rol;
};
