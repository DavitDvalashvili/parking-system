import { Router } from 'express';
import { getHistory } from '../controllers/historyController';

const HistoryRouter = Router();

HistoryRouter.get('/history', getHistory);

export default HistoryRouter;
