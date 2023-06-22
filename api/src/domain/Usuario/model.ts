import { Rol } from '../Rol';

export type Usuario = {
  id: number;
  email: string;
  password?: string;
  rol: Rol;
};

export type UsuarioResponse = Omit<Usuario, 'password'>;

export type UsuarioAuthResponse = {
  userData: Usuario;
  accessToken: string;
  expiresIn: string;
};

export type TokenPayload = {
  email: string;
};

export type JwtPayload = TokenPayload & {
  iat: number;
  exp: number;
};
