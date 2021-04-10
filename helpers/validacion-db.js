//@ts-check

/**
 * Modulo que controla la validación de parámetros en la BBDD.
 * @module helpers/validacion
 */

const sequelize = require('../config/db');
const { initModels } = require('../models/init-models');
const models = initModels(sequelize);

/**
 * Middleware que revisa y valida que exista la categoria solicitada en la base de datos.
 * @async
 * @function existeCategoria
 * @param {Number} id ID de categoria que se quiere buscar en la base de datos.
 * @throws {NotFound} Si la aplicación no consigue una categoria con la ID proporcionada
 * por el cliente, disparará un error avisándole al cliente lo que ha sucedido.
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
 */
const existeCategoria = async(id) => {
  const existeCategoria = await models.category.findOne({where: {id}});
  if(!existeCategoria){
    throw new Error(`No existe una categoria con la id ${id}`);
  }
}

/**
 * Middleware que revisa y valida que exista el producto solicitado en la base de datos.
 * @async
 * @function existeProducto
 * @param {Number} id ID del producto que se desea buscar en la base de datos. 
 * @throws {NotFound} Si la aplicación no consigue el producto con la ID proporcionada
 * por el cliente, disparará un error avisándole al cliente lo que ha sucedido.
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
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