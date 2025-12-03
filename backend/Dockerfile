

FROM node:25

WORKDIR /app

# Copiar solo package.json primero
COPY package.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]