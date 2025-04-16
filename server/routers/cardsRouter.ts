import { Router } from 'express';
import { addNewCard, deleteCard, getCards, getRoles, updateCard } from '../controllers/cardsController';

const CardsRouter: Router = Router();

CardsRouter.post('/addnewcard', addNewCard);
CardsRouter.post('/updatecard', updateCard);
CardsRouter.delete('/deletecard/:card_id', deleteCard);
CardsRouter.get('/cards', getCards);
CardsRouter.get('/roles', getRoles);

export default CardsRouter;
