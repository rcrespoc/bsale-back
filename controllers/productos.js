const { request, response } = require('express');
const { Op } = require('sequelize');
const sequelize = require('../config/db');
const { initModels } = require('../models/init-models');
const models = initModels(sequelize);


const mostrarProductos = async(req = request, res = response) => {
  const {limite = 5, desde = 0} = req.query;
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

const mostrarProductoPorCategoria = async(req = request, res = response) => {
  const {limite = 5, desde = 0} = req.query;
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

const mostrarProductosPorNombre = async (req = request, res = response) => {
  const {limite = 5, desde = 0} = req.query;
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