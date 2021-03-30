const sequelize = require('../config/db');
const { initModels } = require('../models/init-models');
const models = initModels(sequelize);

const existeCategoria = async(id) => {
  const existeCategoria = await models.category.findOne({where: {id}});
  console.log(existeCategoria)
  if(!existeCategoria){
    throw new Error(`No existe una categoria con la id ${id}`);
  }
}

const existeProducto = async(id) => {
  const existeProducto = await models.product.findOne({where: {id}});
  console.log(existeProducto)
  if(!existeProducto){
    throw new Error(`No existe un producto con la id ${id}`);
  }
}

module.exports = {
  existeCategoria,
  existeProducto
}