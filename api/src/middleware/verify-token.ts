import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BaseError, convertSecondsToDateTime, getCurrentDate } from '../utils';
import { EnvVars, HttpStatusCodes } from '../constants';
import { JwtPayload, UsuarioServices } from '../domain/Usuario';
import { RequestWithUser } from './types';

const usuarioServices = new UsuarioServices();

export const VerifyToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const bearer = token!!.split(' ');

  if (
    !token ||
    bearer.length !== 2 ||
    typeof bearer[1] !== 'string' ||
    !bearer[1] ||
    bearer[1] === 'undefined'
  ) {
    throw new BaseError(
      HttpStatusCodes.UNAUTHORIZED,
      'UNAUTHORIZED',
      'No se a proporcionado ningún token válido.',
      {}
    );
  }

  try {
    const decoded = await jwt.verify(bearer[1], EnvVars.Jwt.Secret);
    const { email, exp, ...rest } = decoded as JwtPayload;
    const today = getCurrentDate().toISO();

    if (today!! > convertSecondsToDateTime(exp).toISO()!!) {
      throw new BaseError(
        HttpStatusCodes.UNAUTHORIZED,
        'UNAUTHORIZED',
        'El token proporcionado se encuentra expirado.'
      );
    }

    const user = await usuarioServices.findByEmail(email);
    if (!user) {
      throw new BaseError(
        HttpStatusCodes.UNAUTHORIZED,
        'UNAUTHORIZED',
        'El usuario no es autorizado.',
        { user }
      );
    }
    req.user = {
      email,
      id: user.id,
    };
    next();
  } catch (error: any) {
    throw new BaseError(HttpStatusCodes.UNAUTHORIZED, 'UNAUTHORIZED', error.message);
  }
};
