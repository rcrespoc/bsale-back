const { Router } = require('express');
const { check } = require('express-validator');
const { mostrarProductos, mostrarProducto, mostrarProductoPorCategoria, mostrarProductosPorNombre } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/validacion-db');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.get('/', mostrarProductos)
router.get('/nombre/:name', mostrarProductosPorNombre)
router.get('/:id', [
  check('id','Debe insertar un número de producto').isNumeric(),
  check('id').custom(existeProducto),
  validarCampos
], mostrarProducto)
router.get('/category/:category',[
  check('category','Debe insertar un número de categoria').isNumeric(),
  check('category').custom(existeCategoria),
  validarCampos,
], mostrarProductoPorCategoria)

module.exports = router;