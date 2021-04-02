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
 */
class Server{

  /**
   * Constructor de la clase Servidor.
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
   * Ejecutar los middlewares del servidor.
   * @function middlewares
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
   * Funcion que establece las rutas del servidor.
   * @function routes
   */
  routes(){
    this.app.use(this.path.categorias, require('../routes/categorias'));
    this.app.use(this.path.productos, require('../routes/productos'));
  }

  /**
   * Funcion que coloca el servidor a la escucha y establece el puerto.
   * @function listen
   */
  listen(){
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port)
    })
  }
}

module.exports = Server;