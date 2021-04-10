//@ts-check

/**
 * Modulo que gestiona las categorias en la BBDD.
 * @module controllers/categorias
 */

const { request, response } = require('express');
const sequelize = require('../config/db');
const { initModels } = require('../models/init-models');

/**
 * Función que obtiene las categorias de la BBDD.
 * Retorna un objeto JSON que contiene dos atributos:
 * 
 * 
 *  - Total: El total de elemento que contiene la base de datos en el momento de la consulta.
 *  - Categorias: Los elementos que se trajeron desde la base de datos.
 * 
 * 
 * NOTA: El atributo 'Categorias' NO contiene el total de elementos que almacena la 
 * base de datos sino la cantidad a la que se limitó por los parámetros LIMITE y DESDE
 * los cuales son proporcionados al momento de consumir la API desde el cliente, en el caso
 * de que dichos argumentos no hayan sido dados por el cliente, los mismos obtendrán
 * un valor por defecto. LIMITE = 5, DESDE = 0.
 * @async
 * @function obtenerCategorias
 * @param {Object} req Request. El objeto Request que proviene del cliente con la información
 * que se desea procesar.
 * @param {Object} res Response. El objeto Response que será enviado como respuesta al cliente
 * con la información solicitada.
 * @throws {InternalServerError} Si la aplicación no logra realizar la consulta a la
 * base de datos, va a disparar el error avisandole al cliente con su respectivo código 500.
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
 * 
 */
const obtenerCategorias = async(req = request, res = response) => {
  const {limite = 5, desde = 0} = req.query;
  const models = await initModels(sequelize);
  try {
    const { count: total, rows: categorias } = await models.category.findAndCountAll({
      offset: Number(desde),
      limit: Number(limite)
    })
    res.json({
      total,
      categorias
    });
  } catch (error) {
    res.status(500).json({
      msg: `Contacte con el administrador del servidor`,
    })
  }
}

module.exports = {
  obtenerCategorias
}