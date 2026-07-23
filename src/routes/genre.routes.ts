import { Router } from 'express';
import { GenreController } from '../controllers/genre.controller.js';

const genreRoutes = Router();
const genreController = new GenreController();

genreRoutes.get('/', (req, res) => genreController.getAll(req, res));
genreRoutes.post('/', (req, res) => genreController.create(req, res));

export { genreRoutes };
