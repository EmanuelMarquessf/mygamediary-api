import { Router } from 'express';
import { PlatformController } from '../controllers/platform.controller.js';

const platformRoutes = Router();
const platformController = new PlatformController();

platformRoutes.get('/', (req, res) => platformController.getAll(req, res));
platformRoutes.post('/', (req, res) => platformController.create(req, res));

export { platformRoutes };
