# Descripción e instrucciones del proyecto final

## Datos

- Materia: Programación para internet
- Sección: D13
- Alumnos: Joshua A.R. & Angel Hiram Shakur G.C.

Para realizar este proyecto utilizamos las siguientes tecnologías:
- HTML5
- CSS
- Bootstrap
- Javascript
- NodeJS
- MySQL

## Instalación

Es importante tener instalado NodeJS en la versión 19.8.1, para ello se deberá dirigir a la página oficial de NodeJS, descargarlo e instalarlo como cualquier programa: https://nodejs.org/en

En el caso de MySQL, nosotros utilizamos la versión 8.0.32 y existen muchas maneras y herramientas que te permiten instalarlo correctamente, en nuestro caso fue mediante la página oficial de MySQL: https://www.mysql.com/

## Configuración

Una vez teniendo los archivos del proyecto, se deberá ejecutar la consola de comandos (CMD) en la carpeta del proyecto.

Estando en la carpeta del proyecto se insertará el siguiente comando que permitirá descargar todos los modulos necesarios para el proyecto:

```
npm install
```

Se creará una carpeta llamada "node_modules" la cual contendrá todos los modulos necesarios para el proyecto.

### Importante

Se deberá modificar los datos necesarios que están relacionados con la conexión a la base de datos, estos se encuentran en la siguiente ruta:

```
scr/database.js
```

En este archivo habrán dos secciones que se deberá modificar el "user" y/o "password", dichas secciones están muy bien comentadas para verlas fácilmente.

Además, para hacer funcionar correctamente el envío del correo electrónico al registrarse, se debera configurar la parte comentada en la siguiente ruta:

```
src\lib\passport.js
```

## Ejecución

Para iniciar el proyecto, se deberá ejecutar la consola de comandos (CMD) en la carpeta del proyecto.

Estando en la carpeta del proyecto se insertará el siguiente comando que permitirá ejecutar el proyecto:

```
npm run dev
```

Una vez ejecutada la aplicación, se podrá entrar desde cualquier navegador a través de la siguiente ruta:

```
http://localhost:3000/
```

## Capturas de pantalla

![landingpage1](https://i.imgur.com/06klUcd.png)
![landingpage2](https://i.imgur.com/Y3079Y3.png)
![iniciosesion](https://i.imgur.com/kZmnwRe.png)
![registro](https://i.imgur.com/eENdbrC.png)
![registro2](https://i.imgur.com/65lzJgI.png)
![perfil](https://i.imgur.com/wlEPMUT.png)
![catalogo](https://i.imgur.com/muWP9my.png)
![añadircubo](https://i.imgur.com/7hlh34B.png)
![catalogo2](https://i.imgur.com/zooVd7h.png)
![catalogo3](https://i.imgur.com/3f8TiyU.png)
![editarcubo](https://i.imgur.com/Rt85UjT.png)
![proveedores](https://i.imgur.com/qvYrdCJ.png)
![añadirproveedor](https://i.imgur.com/qsxY2RV.png)
![editarproveedor](https://i.imgur.com/8l3hs2P.png)
![eliminarproveedor](https://i.imgur.com/Nd59M4e.png)
![compras](https://i.imgur.com/oQwaaq1.png)
![registrarcompra](https://i.imgur.com/6Q0qgBk.png)
![compras2](https://i.imgur.com/LKgVEHm.png)
![detallescompras](https://i.imgur.com/oykdVIk.png)
![descargarPDF](https://i.imgur.com/xJotwsU.png)
![PDF](https://i.imgur.com/ck5wrab.png)






