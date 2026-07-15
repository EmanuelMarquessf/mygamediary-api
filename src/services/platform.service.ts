import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client.js';

// O Pool e o Prisma agora moram oficialmente no Service
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Criamos tipos simples para os dados que o Service vai receber do Controller
interface CreatePlatformInput {
  name: string
  icon: string
  color: string
}

export class PlatformService {
  async listAllPlatforms() {
    const platforms = await prisma.platform.findMany({});
    return platforms;
  }

  // Regra para criar um novo jogo
  async createPlatform(data: CreatePlatformInput) {
    if (!data.name) {
      throw new Error('Nome é de preenchimento obrigatório.');
    }
    const newGame = await prisma.platform.create({
      data: {
        name: data.name,
        icon: data.icon,
        color: data.color
      },
    });

    return newGame;
  }
}
