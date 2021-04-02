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
 * Retorna en el objeto res el total de objetos y la cantidad de categorias que se pidió mediante el argumento límite. 
 * @async
 * @function obtenerCategorias
 * @param {Object} req Request.
 * @param {Object} res Response
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