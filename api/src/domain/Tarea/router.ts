import express, { NextFunction, Request, Response } from 'express';
import { TareaServices } from './services';
import { answerOK } from '../../utils';

const router = express.Router();

const tareaService = new TareaServices();
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await tareaService.create(req.body, 1);

    res.json(answerOK(response));
  } catch (error) {
    console.log('error ---> ', error);
    next(error);
  }
});

export default router;
