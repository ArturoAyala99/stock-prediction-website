# Usa la imagen base de Node.js (sin Alpine para compatibilidad con herramientas de desarrollo)
FROM node:24-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias e instálalas
COPY package*.json ./
RUN npm install

COPY . .

# Expone el puerto de Vite en desarrollo (5173 por defecto)
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo de Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
