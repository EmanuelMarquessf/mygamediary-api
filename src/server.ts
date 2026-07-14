import express from 'express';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client.js'; // Importando da pasta gerada

const app = express();

// Configura a conexão do driver PG usando a variável de ambiente
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Passa o adaptador para o construtor do Prisma
const prisma = new PrismaClient({ adapter });

app.use(express.json());

const PORT = 3000;

// Rota para buscar jogos
app.get('/games', async (req, res) => {
  try {
    const games = await prisma.game.findMany();
    return res.json(games);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

// Rota para cadastrar jogo
app.post('/games', async (req, res) => {
  const { title, platform, status, rating, review } = req.body;
  try {
    const newGame = await prisma.game.create({
      data: { title, platform, status, rating, review },
    });
    console.log(newGame)
    return res.status(201).json(newGame);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao cadastrar jogo' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});
