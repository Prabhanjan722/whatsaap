import express from 'express';
import { isAuthenticated } from '../middleWare.js';
import { getMessage, sendMessage } from '../controllers/messageController.js';

const routes = express.Router();

routes.post('/send/:id',isAuthenticated ,sendMessage)
routes.get('/:id',isAuthenticated ,getMessage)

export default routes;