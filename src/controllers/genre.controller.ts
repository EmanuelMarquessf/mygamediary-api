import type { Request, Response } from 'express';
import { GenreService } from '../services/genre.service.js';

const genreService = new GenreService();

export class GenreController {
  async getAll(req: Request, res: Response) {
    try {
      const genre = await genreService.listAllGenres();
      return res.json(genre);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar gêneros no banco.' });
    }
  }

  // POST /games (Cadastrar um novo jogo)
  async create(req: Request, res: Response) {
    try {
      const { name, slug} = req.body;
      if (!name || !slug) {
        return res.status(400).json({ error: 'Nome é obrigatório!' });
      }

      const newGenre = await genreService.createGenre({
        name,
        slug
      });

      return res.status(201).json(newGenre);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar gênero.' });
    }
  }
}
