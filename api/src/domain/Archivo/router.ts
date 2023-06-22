import express, { NextFunction, Request, Response } from 'express';
import { answerOK } from '../../utils';
import {
  RequestWithUser,
  RequestWithUserAndFile,
  RequestWithUserAndFilters,
} from '../../middleware/types';
import { ArchivoServices } from './services';

const router = express.Router();

const archivoServices = new ArchivoServices();
router.post('/:tareaId', async (req: RequestWithUserAndFile, res: Response, next: NextFunction) => {
  try {
    const response = await archivoServices.upload(req, res);

    res.json(answerOK(response));
  } catch (error) {
    next(error);
  }
});

export default router;
