import express from 'express';
import cors from 'cors'; // <-- Importe o CORS
import { gameRoutes } from './routes/game.routes.js';
import { genreRoutes } from './routes/genre.routes.js';
import { platformRoutes } from './routes/platform.routes.js';

const app = express();
const PORT = 3000;

app.use(cors()); // <-- Libere para qualquer origem testar localmente
app.use(express.json());

app.use('/games', gameRoutes);
app.use('/genres', genreRoutes);
app.use('/platforms', platformRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});
