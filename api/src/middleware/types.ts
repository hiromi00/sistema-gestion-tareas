import { Request } from 'express';
import { TareaListReq } from '../domain/Tarea';

export interface RequestWithUser extends Request {
  user?: User;
}

export interface RequestWithUserAndFilters extends Request<{}, any, any, TareaListReq> {
  user?: User;
}

export type User = {
  email?: string;
  id?: number;
};
