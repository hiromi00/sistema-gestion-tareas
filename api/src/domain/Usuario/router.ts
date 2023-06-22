import express, { NextFunction, Request, Response } from 'express';
import { BaseError, answerOK } from '../../utils';
import passport from 'passport';
import { Usuario } from './model';
import { HttpStatusCodes } from '../../constants';
import { UsuarioServices } from './services';

const router = express.Router();

const usuarioServices = new UsuarioServices();
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await passport.authenticate(
      'local-strategie',
      { session: false },
      async (err: Error, user: Usuario) => {
        if (err || !user) {
          return res
            .status(HttpStatusCodes.UNAUTHORIZED)
            .json(
              new BaseError(
                HttpStatusCodes.UNAUTHORIZED,
                'UNAUTHORIZED',
                'Error en el inicio de sesión, verifique sus credenciales.'
              )
            );
        }

        req.login(user, { session: false }, (err) => {
          if (err) {
            return res.send(err);
          }

          const authResponse = usuarioServices.handleLoginResponse(user);

          return res.json(answerOK(authResponse));
        });
      }
    )(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
