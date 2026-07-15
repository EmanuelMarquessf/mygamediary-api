import type { Request, Response } from 'express';
import { PlatformService } from '../services/platform.service.js';

const platformService = new PlatformService();

export class PlatformController {
  async getAll(req: Request, res: Response) {
    try {
      const platform = await platformService.listAllPlatforms();
      return res.json(platform);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar plataformas no banco.' });
    }
  }

  // POST /games (Cadastrar um novo jogo)
  async create(req: Request, res: Response) {
    try {
      const { name, icon, color } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Nome é obrigatórios!' });
      }

      const newPlatform = await platformService.createPlatform({
        name,
        icon,
        color
      });

      return res.status(201).json(newPlatform);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar plataforma.' });
    }
  }
}
