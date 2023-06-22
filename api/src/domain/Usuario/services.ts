import { EnvVars, HttpStatusCodes } from '../../constants';
import { BaseError } from '../../utils';
import { UsuarioDbServices } from './db-services';
import { Usuario, UsuarioAuthResponse, UsuarioResponse, UsuarioRol } from './model';
import { UsuarioRepository } from './repository';
import { comparePassword, generateToken } from './utils';

export class UsuarioServices implements UsuarioRepository {
  async getById(id: number): Promise<UsuarioResponse> {
    const user = await UsuarioDbServices.getById(id);

    if (!user) {
      throw new BaseError(HttpStatusCodes.NOT_FOUND, 'NOT FOUND', 'Usuario no encontrado.');
    }

    return user;
  }

  async findSharedList(list: number[]): Promise<UsuarioResponse[]> {
    const users = await UsuarioDbServices.findMultiplesUsersByIds(list);

    if (users.length !== list.length) {
      throw new BaseError(
        HttpStatusCodes.BAD_REQUEST,
        'BAD REQUEST',
        'Alguno de los usuarios no se ecnuentra dento de la lista de usuarios compartidos.'
      );
    }

    return users;
  }

  findUserInSharedList(userId: number, listId: number[]): number | undefined {
    const userExist = listId.find((user) => user === userId);

    return userExist;
  }

  async login(email: string, password: string, done: Function): Promise<void> {
    try {
      const user = await UsuarioDbServices.findByEmail(email);

      if (!user) {
        throw new BaseError(HttpStatusCodes.BAD_REQUEST, 'BAD REQUEST', 'Usuario no encontrado.');
      }

      const passwordMatch = await comparePassword(password, user.password!!);

      if (!passwordMatch) {
        throw new BaseError(
          HttpStatusCodes.BAD_REQUEST,
          'BAD REQUEST',
          'Usuario o contraseña incorrectos.'
        );
      }

      const { password: userPassword, ...userWithoutPassword } = user;

      return done(null, userWithoutPassword, {
        message: 'Logged In Successfully',
      });
    } catch (error) {
      console.log('error login ---> ', error);

      done(error);
    }
  }

  async findByEmail(email: string): Promise<Usuario> {
    const userFound = await UsuarioDbServices.findByEmail(email);

    if (!userFound) {
      throw new BaseError(HttpStatusCodes.BAD_REQUEST, 'BAD REQUEST', 'Usuario no encontrado.');
    }

    return userFound;
  }

  handleLoginResponse(user: Usuario): UsuarioAuthResponse {
    const token = generateToken({ email: user.email });

    const result: UsuarioAuthResponse = {
      accessToken: token,
      expiresIn: EnvVars.Jwt.Exp,
      userData: user,
    };

    return result;
  }

  async getRol(userId: number): Promise<UsuarioRol> {
    const rol = await UsuarioDbServices.getRol(userId);

    if (!rol) {
      throw new BaseError(HttpStatusCodes.NOT_FOUND, 'NOT FOUND', 'Rol no encontrado.');
    }

    return rol;
  }
}
