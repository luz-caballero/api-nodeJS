
# API REST con Express y MongoDB

Este proyecto es una API REST creada con **Node.js**, **Express**, y **MongoDB**. Aquí encontrarás una guía paso a paso sobre cómo configurar y ejecutar la aplicación localmente.

---

## Requisitos Previos

Antes de empezar, asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js**: Asegúrate de tener instalada la versión más reciente de Node.js. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **Docker**: Docker es utilizado para contenerizar la aplicación y MongoDB. Puedes descargarlo desde [docker.com](https://www.docker.com/get-started).
- **MongoDB**: Si no usas Docker, asegúrate de tener MongoDB instalado o usa un servicio en la nube como MongoDB Atlas.

---

## Paso 1: Clonar el Repositorio

Si aún no has clonado el repositorio, usa el siguiente comando:

```bash
git clone https://github.com/usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
```

## Paso 2: Instalar Dependencias

Para instalar las dependencias necesarias, ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
```

## Paso 3: Configuración de MongoDB

### Opción 1: Usar MongoDB Localmente

Si prefieres usar MongoDB localmente, asegúrate de que MongoDB esté corriendo en tu máquina local en el puerto **27017**.

### Opción 2: Usar MongoDB con Docker

Si prefieres usar Docker, puedes levantar un contenedor de MongoDB con el siguiente comando:

```bash
docker run -d --name mongodb_container -p 27017:27017 mongo:latest
```

Esto ejecutará MongoDB en un contenedor Docker, y la base de datos será accesible desde el puerto **27017**.

---

## Paso 4: Configuración de la Aplicación

Dentro del archivo **`index.js`**, la aplicación se conecta a MongoDB con la siguiente URL por defecto:

```javascript
mongoose.connect('mongodb://mongodb_container:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
```

Si estás usando MongoDB localmente, la URL debería ser:

```javascript
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
```

---

## Paso 5: Configuración de Docker (Opcional)

Si prefieres contenerizar tanto la aplicación como MongoDB, puedes usar **Docker Compose**.

1. Crea un archivo **`docker-compose.yml`** con el siguiente contenido:

    ```yaml
    services:
      app:
        build: .
        ports:
          - "3001:3001"
        depends_on:
          - mongodb
      mongodb:
        image: mongo:latest
        ports:
          - "27017:27017"
    ```

2. Crea un archivo **`Dockerfile`** para la aplicación Express:

    ```dockerfile
    # Usa una imagen oficial de Node.js como base
    FROM node:16

    # Establece el directorio de trabajo dentro del contenedor
    WORKDIR /usr/src/app

    # Copia el archivo package.json y package-lock.json al contenedor
    COPY package*.json ./

    # Instala las dependencias de la aplicación
    RUN npm install

    # Copia el resto del código de la aplicación al contenedor
    COPY . .

    # Expone el puerto en el que la aplicación escucha
    EXPOSE 3001

    # Comando para iniciar la aplicación
    CMD ["npm", "start"]
    ```

3. Levanta los contenedores con Docker Compose:

    ```bash
    docker-compose up --build
    ```

    Esto creará y ejecutará dos contenedores: uno para la aplicación Express y otro para MongoDB.

---

## Paso 6: Ejecutar la Aplicación Localmente

Una vez que hayas configurado MongoDB y las dependencias de la aplicación, puedes iniciar el servidor con el siguiente comando:

```bash
npm start
```

Esto iniciará el servidor en el puerto **3000** por defecto. Si estás utilizando Docker, la aplicación será accesible en el puerto **3001** en tu máquina local.

Accede a la aplicación desde tu navegador en:

```
http://localhost:3001
```

---

## Paso 7: Pruebas

Para probar que la API funciona correctamente, puedes usar **Postman** o **Thunder Client** en Visual Studio Code para enviar peticiones a los siguientes endpoints:

- **GET `/api/users`**: Obtiene la lista de usuarios.
- **POST `/api/users`**: Crea un nuevo usuario. En el cuerpo de la solicitud, incluye los campos `name`, `email`, `age`.
- **PATCH `/api/users/:id`**: Actualiza un usuario por su ID.
- **DELETE `/api/users/:id`**: Elimina un usuario por su ID.

---

## Paso 8: Desplegar la Aplicación (Opcional)

Si deseas desplegar tu aplicación en un entorno de producción, puedes usar servicios como **AWS**, **Docker Swarm**, **Kubernetes**, o **Heroku** para desplegarla en la nube.

---

## Estructura del Proyecto

```
├── src/
│   ├── controllers/
│   │   ├── usersController.js
│   ├── models/
│   │   ├── userModel.js
│   ├── routes/
│   │   ├── usersRoutes.js
│   ├── database/
│   │   ├── conexion.js
│   ├── index.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── .gitignore
```

---

## Contribuir

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una rama con tu nueva funcionalidad: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz un commit: `git commit -am 'Agregada nueva funcionalidad'`.
4. Haz push a la rama: `git push origin feature/nueva-funcionalidad`.
5. Crea un Pull Request desde GitHub.

---

## Licencia

Este proyecto está bajo la Licencia LCV. Consulta el archivo **`LICENSE`** para más detalles.
