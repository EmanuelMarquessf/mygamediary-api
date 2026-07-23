import type { Request, Response } from 'express';
import { GameService } from '../services/game.service.js';

const gameService = new GameService();

export class GameController {
  async getAll(req: Request, res: Response) {
    try {
      const games = await gameService.listAllGames();
      return res.json(games);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar jogos no banco.' });
    }
  }

  // POST /games (Cadastrar um novo jogo)
  async create(req: Request, res: Response) {
    try {
      console.log("entrou na controller")
      const { title, description, image, backgroundImage, developer, publisher, releaseDate, genres, averagePlaytime, metacriticScore, platformId} = req.body;
      if (!title) {
        return res.status(400).json({ error: 'Título, plataforma e status são obrigatórios!' });
      }

      // const newGame = await gameService.createGame({
      //   title,
      //   description,
      //   image,
      //   backgroundImage,
      //   developer,
      //   publisher,
      //   releaseDate,
      //   genres,
      //   averagePlaytime,
      //   metacriticScore,
      //   platformId
      // });

      //return res.status(201).json(newGame);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar jogo.' });
    }
  }
}
