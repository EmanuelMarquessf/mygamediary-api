import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client.js';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export interface CreateGameDTO {
  rawgId?: number;
  title: string;
  description?: string;
  image?: string;
  genres?: { name: string; slug: string }[];
  platforms?: { name: string; icon?: string; color?: string }[];
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

  async create(data: CreateGameDTO) {

    const genresData = data.genres?.map((genre) => ({
      where: { name: genre.name },
      create: {
        name: genre.name,
        slug: genre.slug || genre.name.toLowerCase().replace(/\s+/g, '-')
      }
    })) || [];

    const platformsData = data.platforms?.map((platform) => ({
      where: { name: platform.name }, // Procura pelo nome único da plataforma (ex: "PC", "Nintendo Switch")
      create: {
        name: platform.name,
        icon: platform.icon || 'default-icon',
        color: platform.color || '#000000'
      }
    })) || [];

    return await prisma.game.create({
      data: {
        rawgId: data.rawgId || null,
        title: data.title,
        description: data.description || null,
        image: data.image || null,

        genres: {
          connectOrCreate: genresData
        },

        platforms: {
          connectOrCreate: platformsData
        }
      },
      include: {
        genres: true,
        platforms: true
      }
    });
  }
}
