//@ts-check

/**
 * Modulo que controla la validación de parámetros en la BBDD.
 * @module helpers/validacion
 */

const sequelize = require('../config/db');
const { initModels } = require('../models/init-models');
const models = initModels(sequelize);

/**
 * Funcion que revisa si existe dicha categoria en la BBDD.
 * @async
 * @function existeCategoria
 * @param {Number} id ID de categoria que se quiere buscar en la base de datos.
 */
const existeCategoria = async(id) => {
  const existeCategoria = await models.category.findOne({where: {id}});
  if(!existeCategoria){
    throw new Error(`No existe una categoria con la id ${id}`);
  }
}

/**
 * Funcion que revisa si existe dicho producto en la BBDD.
 * @async
 * @function existeProducto
 * @param {Number} id ID de producto que se quiere buscar en la base de datos.
 */
const existeProducto = async(id) => {
  const existeProducto = await models.product.findOne({where: {id}});
  if(!existeProducto){
    throw new Error(`No existe un producto con la id ${id}`);
  }
}

module.exports = {
  existeCategoria,
  existeProducto
}