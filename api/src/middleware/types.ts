import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: User;
}

export type User = {
  email?: string;
  id?: number;
};
