//@ts-check

/**
 * Modulo que inicializa el objeto para la base de datos.
 * @module db
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Variable que contiene la conexión a la base de datos.
 */
const sequelize = new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER, process.env.BD_PASS, {
  host: process.env.BD_HOST,
  dialect: 'mysql',
  //@ts-ignore
  port: process.env.BD_PORT,
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})


module.exports = sequelize