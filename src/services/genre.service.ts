import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client.js';

// O Pool e o Prisma agora moram oficialmente no Service
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Criamos tipos simples para os dados que o Service vai receber do Controller
interface CreateGenreInput {
  name: string
  slug: string
}

export class GenreService {
  async listAllGenres() {
    const genres = await prisma.genre.findMany({});
    return genres;
  }

  // Regra para criar um novo jogo
  async createGenre(data: CreateGenreInput) {
    if (!data.name) {
      throw new Error('Nome é de preenchimento obrigatório.');
    }
    const newGenre = await prisma.genre.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    return newGenre;
  }
}
