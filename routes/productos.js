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
 * Ruta para obtener los productos disponibles en la base de datos.
 * @name mostrarProductos
 * @path {GET} /
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
 */
router.get('/', mostrarProductos)

/**
 * Ruta para obtener los productos filtrados por nombre desde la base de datos.
 * @name mostrarProductosPorNombre
 * @path {GET} /nombre/:name
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
 */
router.get('/nombre/:name', mostrarProductosPorNombre)

/**
 * Ruta para mostrar producto por ID especifica.
 * @name mostrarProductos
 * @path {GET} /:id
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
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
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
 */
router.get('/category/:category',[
  check('category','Debe insertar un número de categoria').isNumeric(),
  check('category').custom(existeCategoria),
  validarCampos,
], mostrarProductoPorCategoria)

module.exports = router;