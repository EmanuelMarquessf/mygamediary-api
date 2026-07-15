#Imagem base leve do Node
FROM node:20-alpine

#Define o diretório de trabalho dentro do container
WORKDIR /app

#Copia os arquivos de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./

#Instala as dependências de desenvolvimento e produção
RUN npm install

#Copia o schema do Prisma e o restante do código
COPY prisma ./prisma/
COPY . .

#Roda o gerador do Prisma para garantir as tipagens no container
RUN npx prisma generate

#Expõe a porta 3000 (onde o seu Express roda)
EXPOSE 3000

#Comando para iniciar em modo de desenvolvimento
CMD ["npm", "run", "dev"]
