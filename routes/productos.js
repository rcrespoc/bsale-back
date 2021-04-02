//@ts-check

/**
 * Modulo de rutas para los productos
 * ROUTE: /api/productos/
 * @module routes/productos
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { mostrarProductos, mostrarProducto, mostrarProductoPorCategoria, mostrarProductosPorNombre } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/validacion-db');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

/**
 * Ruta para obtener los productos
 * @name mostrarProductos
 * @path {GET} /
 */
router.get('/', mostrarProductos)

/**
 * Ruta para obtener los productos filtrados por nombre
 * @name mostrarProductosPorNombre
 * @path {GET} /nombre/:name
 */
router.get('/nombre/:name', mostrarProductosPorNombre)

/**
 * Ruta para mostrar producto por ID especifica.
 * @name mostrarProductos
 * @path {GET} /:id
 */
router.get('/:id', [
  check('id','Debe insertar un número de producto').isNumeric(),
  check('id').custom(existeProducto),
  validarCampos
], mostrarProducto)

/**
 * Ruta para obtener los productos por categoria.
 * @name mostrarProductoPorCategoria
 * @path {GET} /category/:category
 */
router.get('/category/:category',[
  check('category','Debe insertar un número de categoria').isNumeric(),
  check('category').custom(existeCategoria),
  validarCampos,
], mostrarProductoPorCategoria)

module.exports = router;