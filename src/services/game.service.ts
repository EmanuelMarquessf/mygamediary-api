import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client.js';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

interface CreateGameInput {
  title: string;
  status: string;
  rating?: number;
  review?: string;
  platformId: string;
}

export class GameService {

  async listAllGames() {
    // Aqui você poderia colocar filtros futuramente (ex: só trazer jogos de Switch)
    const games = await prisma.game.findMany({
      orderBy: {
        createdAt: 'desc', // Traz os adicionados mais recentemente primeiro
      },
    });
    return games;
  }

  // Regra para criar um novo jogo
  async createGame(data: CreateGameInput) {
    // Exemplo de regra de negócio: Garante que a nota esteja entre 1 e 5 (se enviada)
    if (data.rating && (data.rating < 1 || data.rating > 5)) {
      throw new Error('A avaliação deve ser uma nota entre 1 e 5.');
    }

    // Salva de fato no banco de dados
    return await prisma.game.create({
      data: {
        title: data.title,
        status: data.status,
        rating: data.rating ?? null,
        review: data.review ?? null,
        platformId: data.platformId, // Vincula o jogo ao ID da plataforma
      },
      include: {
        platform: true, // Já retorna o jogo com a plataforma populada
      },
    });
  }
}
