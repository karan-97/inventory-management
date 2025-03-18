import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes'

const router = Router();

const apiMessage = '🚀 API is running!';

router.get('/', async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send(apiMessage);
});

export default router;