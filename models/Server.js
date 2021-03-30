const express = require('express');
const cors = require('cors');
const sequelize = require('../config/db');

class Server{
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

  middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }
  async conectarDB(){
    try {
      await sequelize.authenticate();
      console.log('Conectado a la BD')
    } catch (error) {
      throw new Error('Error en la base de datos. [Conexión]');
    }
  }
  routes(){
    this.app.use(this.path.categorias, require('../routes/categorias'));
    this.app.use(this.path.productos, require('../routes/productos'));
  }
  listen(){
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port)
    })
  }
}

module.exports = Server;