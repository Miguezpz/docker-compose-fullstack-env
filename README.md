# docker-compose-fullstack-env
Full stack development environment using Docker Compose. It runs a Node.js backend and an NGINX frontend in separate containers connected through a custom network. Created as a practice project to reinforce Docker fundamentals and service orchestration.


<Website image> aqui colocare una imagen de como se ve la pagina web


En este repositorio de github tenemos acceso a los folders backend, frontend y docker-compose.yml, hablaré de su uso:

💿 En el folder backend tenemos el archivo 
- index.js: este código actua como servidor, genera numeros aleatorios entre el 1 y el 100, también puede devolver una lista de los números generados con anterioridad. 
- package.json: index.js requiere los modulos o dependencias de express y cors, los cuales están listados en el archivo package.json. 
- Dockerfile: También tenemos el archivo Dockerfile, este son instrucciones para Docker en cuanto como montar el contenedor, el cual utiliza nodejs en su versión 25, copia package.json en los directorios del contenedor, instala npm y ejecuta index.js con el comando node. Es importante mencionar que expone el puesto 3000. 
🔗 Para llamar a pedir un número aleatorio es mediante el siguiente url: http://localhost:3000//my-app/generateNumber
🔗 Para pedir la lista de los números random generados es por el siguiente url: http://localhost:3000/my-app/seeNumbers

💿 En el folder frontend tenemos a
- website (folder): el cual contiene el archivo index.html, es la página web que interactua con el backend, hace fetch a las urls ya antes mencionadas.
- Dockerfile: Utiliza la imágen de nginx en su versión 1.28.0-alpine, además copia el archivo index.html en la imagen de nginx en la ruta /usr/share/nginx/html. De igual manera es importante destacar que el puerto 8080 está expuesto, por lo que si quieres acceder a la página web manualmente es mediante el siguiente link: http://localhost:8080/

💿 docker-compose.yml
- Este es el archivo maestro, orquesta el montaje de los contenedores. Sus instrucciones son las siguientes:
👉🏻 Construye la imágen para el backend utilizando el Dockerfile del folder backend, le asigna el nombre de node_backend y el tag de latest a la imágen, se lee como "node_backend:latest". Expone el puerto 3000, y asigna la red llamada "app_network".
👉🏻 También construye la imágen para el frontend utilizando el Dockerfile contenido dentro del folder frontend, le da el nombre de "nginx_frontend:latest" a la imágen. Expone el puerto "8080:80", también utiliza la misma red que utiliza la imágen del backend, el cual es "app_network". Y mantiene un hot reload con el uso de volumes, el cual escucha los cambios en ./frontend/website y su destino es en los archivos internos de la imagen en /usr/share/nginx/html

Este es un ambiente de desarrollo, por lo que puedes editar el funcionamiento del backend desde el código de index.js dentro del folder backend, y puedes editar la página web desde el código de index.html dentro del folder frontend/website/

He subido ambas imagenes ya creadas a Docker Hub:
📖 Backend image -> miguezpz/node_server:latest
📖 Frontend image -> miguezpz/website:latest

✏️ En el archivo docker-compose.yml he dejado comentarios que indican que comandos utilizar para que docker monte los contenedores, como también comandos para hacer run a mis imagenes sin necesidad de docker compose, es importante que si decides ir por el camino manual entonces debes crear una red interna con el comando "docker network create app_network", ahora si les comparto los comandos para mis imagenes.

💻 Backend:
    docker run --rm -d -p 3000:3000 --network app_network --name backend miguezpz/node_server:latest

💻 Frontend:
    docker run --rm -d -p 8080:80 --network app_network --name frontend miguezpz/website:latest
    
    👉🏻 Para hot reload:
        docker run --rm -d -p 8080:80 --network app_network --name frontend -v "$(pwd)/frontend/website:/usr/share/nginx/html" miguezpz/website:latest