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
 * Función que obtiene las productos de la BBDD.
 * Retorna un objeto JSON que contiene dos atributos:
 * 
 * 
 *  - Total: El total de elemento que contiene la base de datos en el momento de la consulta.
 *  - Productos: Los elementos que se trajeron desde la base de datos.
 * 
 * 
 * NOTA: El atributo 'Productos' NO contiene el total de elementos que almacena la 
 * base de datos sino la productos a la que se limitó por los parámetros LIMITE y DESDE
 * los cuales son proporcionados al momento de consumir la API desde el cliente, en el caso
 * de que dichos argumentos no hayan sido dados por el cliente, los mismos obtendrán
 * un valor por defecto. LIMITE = 6, DESDE = 0.
 * @async
 * @function mostrarProductos
 * @param {Object} req Request. El objeto Request que proviene del cliente con la información
 * que se desea procesar.
 * @param {Object} res Response. El objeto Response que será enviado como respuesta al cliente
 * con la información solicitada.
 * @throws {InternalServerError} Si la aplicación no logra realizar la consulta a la
 * base de datos, va a disparar el error avisandole al cliente con su respectivo código 500.
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
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
 * Función que retorna el producto que ha sido solicitado desde el cliente.
 * 
 * NOTA: Los productos son buscados mediante la ID.
 * @async
 * @function mostrarProducto
 * @param {Object} req Request. El objeto Request que proviene del cliente con la información
 * que se desea procesar.
 * @param {Object} res Response. El objeto Response que será enviado como respuesta al cliente
 * con la información solicitada.
 * @throws {InternalServerError} Si la aplicación no logra realizar la consulta a la
 * base de datos, va a disparar el error avisandole al cliente con su respectivo código 500.
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
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
 * Función que obtiene las productos de la BBDD.
 * Retorna un objeto JSON que contiene dos atributos:
 * 
 * 
 *  - Total: El total de elemento que contiene la base de datos en el momento de la consulta.
 *  - Productos: Los elementos que se trajeron desde la base de datos.
 * 
 * 
 * NOTA: El atributo 'Productos' NO contiene el total de elementos que almacena la 
 * base de datos sino la productos a la que se limitó por los parámetros LIMITE y DESDE
 * los cuales son proporcionados al momento de consumir la API desde el cliente, en el caso
 * de que dichos argumentos no hayan sido dados por el cliente, los mismos obtendrán
 * un valor por defecto. LIMITE = 6, DESDE = 0.
 * 
 * @async
 * @method
 * @function mostrarProductoPorCategoria
 * @param {Object} req Request. El objeto Request que proviene del cliente con la información
 * que se desea procesar.
 * @param {Object} res Response. El objeto Response que será enviado como respuesta al cliente
 * con la información solicitada.
 * @throws {InternalServerError} Si la aplicación no logra realizar la consulta a la
 * base de datos, va a disparar el error avisandole al cliente con su respectivo código 500.
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
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
 * Función que obtiene las productos de la BBDD.
 * Retorna un objeto JSON que contiene dos atributos:
 * 
 * 
 *  - Total: El total de elemento que contiene la base de datos en el momento de la consulta.
 *  - Productos: Los elementos que se trajeron desde la base de datos.
 * 
 * 
 * NOTA: El atributo 'Productos' NO contiene el total de elementos que almacena la 
 * base de datos sino la productos a la que se limitó por los parámetros LIMITE y DESDE
 * los cuales son proporcionados al momento de consumir la API desde el cliente, en el caso
 * de que dichos argumentos no hayan sido dados por el cliente, los mismos obtendrán
 * un valor por defecto. LIMITE = 6, DESDE = 0.
 * 
 * @async
 * @function mostrarProductosPorNombre
 * @param {Object} req Request. El objeto Request que proviene del cliente con la información
 * que se desea procesar.
 * @param {Object} res Response. El objeto Response que será enviado como respuesta al cliente
 * con la información solicitada.
 * @throws {InternalServerError} Si la aplicación no logra realizar la consulta a la
 * base de datos, va a disparar el error avisandole al cliente con su respectivo código 500.
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
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