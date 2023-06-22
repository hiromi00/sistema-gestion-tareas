import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TokenPayload } from './model';
import { EnvVars } from '../../constants';

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, EnvVars.Jwt.Secret, {
    expiresIn: EnvVars.Jwt.Exp,
  });
  return token;
};
