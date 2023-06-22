import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UsuarioServices } from '../domain/Usuario';

const usuarioServices = new UsuarioServices();
passport.use(
  'local-strategie',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    usuarioServices.login
  )
);

export default passport;
