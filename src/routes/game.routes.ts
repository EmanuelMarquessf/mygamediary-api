import { Router } from 'express';
import { GameController } from '../controllers/game.controller.js';

const gameRoutes = Router();
const gameController = new GameController();

gameRoutes.get('/', gameController.getAll);
gameRoutes.post('/', gameController.create);

export { gameRoutes };
