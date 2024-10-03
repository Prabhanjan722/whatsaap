import express from 'express';
import { getAllUser, logout, signin, signup } from '../controllers/userController.js';
import { isAuthenticated } from '../middleWare.js';

const routes = express.Router();

routes.post('/signup', signup)
routes.post('/signin', signin)
routes.get('/logout', logout)
routes.get('/', isAuthenticated ,getAllUser)

export default routes;