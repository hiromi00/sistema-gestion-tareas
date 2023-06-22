# Sistema de gestión de tareas

## Descripción
En el siguiente proyecto se ha implementado un API completamente funcional para la gestión de tareas.
Como se mencionó ateriormente Este cuenta con la capacidad de poder gestionar tareas entre diversos usuarios, obteniendo así un API Rest capaz de `crear`,`editar`, `eliminar`, `completar` y `visualizar` diversas tareas.

## Planificación

Para analisar la planificación de cada uno de los módulos se puede visitar la siguiente liga: [Sistema de Gestión de Tareas (SGT)](https://succinct-aquarius-155.notion.site/Sistema-de-Gesti-n-de-Tareas-08f7ad8f6109467c9ba9953d9374c2ce?pvs=4).

## Estructura de los archivos del API

Para la estructura de los archivos se ha decidido seguir el módelo `onion architecture` donde se pretende tener un dominio del sistema que nos permita alojar y separar cada modelo y sus diversas funionalidades. Siendo asi, la carpeta del dominio se visualiza de la siguiente manera
```
api
├───src
│   ├───domain
│   │   ├───Model
│   │   │   ├───model.ts
│   │   │   ├───repository.ts
│   │   │   ├───services.ts
│   │   │   ├───router.ts
│   │   │   ├───db-services.ts
│   │   │   └───... <- Algún otro archivo necesario para su correcta funcionalidad. Por ejemplo `utils.ts`
│   │   └───...
│   └───... 
└───...
```
## Manual de instalación

Para poder utilizar este repositorio es necesario seguir estos pasos:

1\.- Clonar el repositorio en su máquina con el siguiente script:
```shell
git clone <http_repo_url>
```

2\.- Acceder a la ruta donde se descargó el repositorio para ejectar los archivos de configuración.

3\.- Una vez clonado es necesario de tener docker instalado en su máquina. Para instalar docker se puede consultar la siguiente liga: [Docker](https://docs.docker.com/engine/install/).

* Una vez con docker instalado, se procede a utilizar el script:
  
  ```shell
    docker-compose up -d --build
  ```
  NOTA: Con este script lo que pasará es que se crearan un compose con todos los contenedores que tiene el proyecto, que son:

    * api
    * db
    * adminer (visualizador de la db)

4\.- Para finalizar, es necesario ejecutar las migraciones y los seeders para una completa funcionalidad. Para ello hay que ejecutar el siguiente script para abrir la terminal del API.
```shell
docker exect -it sgt_api
```
5\.- Ya que se tiene ejecutando la terminal del API, hayq eue ejcutar migraciones y seeders

* Para las migraciones se ejecuta el script
    ```shell
    npm run migrate
    ```
* Para los seeders se ejecuta el siguiente script:
    ```shell
    npm run seed
    ```
Siguiendo estos pasos, usted ya será capaz de poder utilizar el proyecto.

## Documentación del API

PAra consultar la manera en la que se pueden realizar peticiones al API, favor de consultar la siguinete documentación: [API Doc](https://succinct-aquarius-155.notion.site/API-Documentation-0bb482520d0043de993f41fc581ece87?pvs=4).


