//@ts-check

/**
 * Modulo de gestión de productos en la BBDD.
 * @module controllers/productos
 */

const { request, response } = require('express');
const { Op } = require('sequelize');
const sequelize = require('../config/db');
const { initModels } = require('../models/init-models');
const models = initModels(sequelize);

/**
 * Función que muestra los productos desde la base de datos limitados por los argumentos dados.
 * @async
 * @function mostrarProductos
 * @param {Object} req Request
 * @param {Object} res Response
 */
const mostrarProductos = async(req = request, res = response) => {
  const {limite = 6, desde = 0} = req.query;
  try {
    const { count: total, rows: productos } = await models.product.findAndCountAll({
      offset: Number(desde),
      limit: Number(limite),
    })

    res.json({
      total,
      productos
    });
  } catch (error) {
    res.status(500).json({
      msg: `Contacte con el administrador del servidor 500`,
    })
  }
}

/**
 * Función que muestra el producto desde la base de datos según la ID dada por el cliente.
 * @async
 * @function mostrarProducto
 * @param {Object} req Request
 * @param {Object} res Response
 */
const mostrarProducto = async(req = request, res = response) => {
  const { id } = req.params;
  try {
    const producto = await models.product.findOne({
      where: { id }
    })
    res.json({
      producto
    });
  } catch (error) {
    res.status(500).json({
      msg: `Contacte con el administrador del servidor`,
    })
  }
}

/**
 * Función que muestra los productos desde la base de datos limitados por los argumentos dados y filtrados por categoria.
 * @async
 * @function mostrarProductoPorCategoria
 * @param {Object} req Request
 * @param {Object} res Response
 */
const mostrarProductoPorCategoria = async(req = request, res = response) => {
  const {limite = 6, desde = 0} = req.query;
  const { category } = req.params;
  try{
    const { count: total, rows: productos } = await models.product.findAndCountAll({
      where: { category },
      offset: Number(desde),
      limit: Number(limite)
    })
    res.json({
      total,
      productos
    });
  } catch (error) {
    res.status(500).json({
      msg: `Contacte con el administrador del servidor`,
    })
  }
}

/**
 * Función que muestra los productos por nombre desde la base de datos limitados por los argumentos dados.
 * @async
 * @function mostrarProductosPorNombre
 * @param {Object} req Request
 * @param {Object} res Response
 */
const mostrarProductosPorNombre = async (req = request, res = response) => {
  const {limite = 6, desde = 0} = req.query;
  const { name } = req.params;
  try{
    const { count: total, rows: productos } = await models.product.findAndCountAll({
      where: { name: {
        [Op.substring]: name
      } },
      
      offset: Number(desde),
      limit: Number(limite)
    })
    res.json({
      total,
      productos
    });
  } catch (error) {
    res.status(500).json({
      msg: `Contacte con el administrador del servidor`,
    })
  }
}

module.exports = {
  mostrarProductos,
  mostrarProducto,
  mostrarProductoPorCategoria,
  mostrarProductosPorNombre
}