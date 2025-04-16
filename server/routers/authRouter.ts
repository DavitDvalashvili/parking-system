import { Router } from 'express';
import { checkSession, login, logout } from '../controllers/authController';

const AuthRouter = Router();

AuthRouter.post('/login', login);
AuthRouter.post('/logout', logout);
AuthRouter.get('/checksession', checkSession);

export default AuthRouter;
