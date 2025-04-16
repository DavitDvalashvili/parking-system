import { Router } from 'express';
import { addNewCounter, getCounters } from '../controllers/counterController';

const CounterRouter = Router();

CounterRouter.post('/addcounter', addNewCounter);
CounterRouter.get('/getcounters', getCounters);

export default CounterRouter;
