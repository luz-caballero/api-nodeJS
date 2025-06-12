# Usa la imagen oficial de Node.js como base
FROM node:16

# Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que tu aplicación escuchará
EXPOSE 3001

# Iniciar la aplicación
CMD ["npm", "start"]
