import express, { NextFunction, Request, Response } from 'express';
import { TareaServices } from './services';
import { answerOK } from '../../utils';
import { RequestWithUser } from '../../middleware/types';

const router = express.Router();

const tareaService = new TareaServices();
router.post('/', async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const response = await tareaService.create(req.body, req.user!!.id!!);

    res.json(answerOK(response));
  } catch (error) {
    console.log('error ---> ', error);
    next(error);
  }
});

router.delete('/:id', async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const response = await tareaService.remove(id, req.user!!.id!!);

    res.json(answerOK(response));
  } catch (error) {
    console.log('error ---> ', error);
    next(error);
  }
});

export default router;
