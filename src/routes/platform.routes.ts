import { Router } from 'express';
import { PlatformController } from '../controllers/platform.controller.js';

const platformRoutes = Router();
const platformController = new PlatformController();

platformRoutes.get('/', platformController.getAll);
platformRoutes.post('/', platformController.create);

export { platformRoutes };
