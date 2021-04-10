//@ts-check

/**
 * Clase del servidor de NodeJS.
 * @module Servidor
 */


const express = require('express');
const cors = require('cors');
const sequelize = require('../config/db');

/**
 * Clase para crear un servidor.
 * 
 * Esta clase implementa un servidor para conectarse a la base de datos, procesar las
 * solicitudes que se hagan a sus rutas y posteriormente se gestionen las consultas a la base de datos.
 * 
 * El servidor está implementado con el Framework Express y su trabajo principal es colocarse a la escucha
 * en un puerto declarado y poder empezar a recibir solicitudes desde el Frontend.
 * @see {@link https://rcrespoc.github.io/bsale-back/module-Servidor.html|Servidor}
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
 */
class Server{

  /**
   * Constructor de la clase Servidor.
   * 
   * El constructor inicializa el servidor con Express y declara los atributos necesarios
   * para poder poner en funcionamiento el servidor. (Paths, puerto, middlewares y rutas).
   */
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.path = {
      categorias: '/api/categorias/',
      productos:  '/api/productos/'
    }
    this.conectarDB();
    this.middlewares();
    this.routes();
  }
  /**
   * Ejecutar los middlewares del servidor, tales como: CORS, el parseo del Body
   * y la declaración de la carpeta que contiene los archivos estáticos del proyecto.
   * @function middlewares
   * @since 1.0.0
   * @version 1.0.0
   * @author Richard Crespo
   */
  middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  /**
   * Funcion que contecta el servidor a la base de datos.
   * @async
   * @function conectarDB
   * @throws {InternalServerError} Si la aplicación no logra realizar la conexión a la
   * base de datos, va a disparar el error avisandole al cliente.
   * @since 1.0.0
   * @version 1.0.0
   * @author Richard Crespo
   */
  async conectarDB(){
    try {
      await sequelize.authenticate();
      console.log('Conectado a la BD')
    } catch (error) {
      throw new Error('Error en la base de datos. [Conexión]');
    }
  }

  /**
   * Funcion que establece las rutas del servidor, hace uso del atributo path de la clase
   * Server para poder declarar las rutas permitidas.
   * @function routes
   * @since 1.0.0
   * @version 1.0.0
   * @author Richard Crespo
   */
  routes(){
    this.app.use(this.path.categorias, require('../routes/categorias'));
    this.app.use(this.path.productos, require('../routes/productos'));
  }

  /**
   * Funcion que coloca el servidor a la escucha y establece el puerto. Hace uso del 
   * atributo port de la clase Server.
   * @function listen
   * @since 1.0.0
   * @version 1.0.0
   * @author Richard Crespo
   */
  listen(){
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port)
    })
  }
}

module.exports = Server;