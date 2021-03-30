const { request, response } = require('express');
const sequelize = require('../config/db');
const { initModels } = require('../models/init-models');

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