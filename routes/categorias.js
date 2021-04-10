//@ts-check

/**
 * Modulo de rutas para las categorias
 * ROUTE: /api/categorias/
 * @module routes/categorias
 * 
 */

const { Router } = require('express');
const { obtenerCategorias } = require('../controllers/categorias')

const router = Router();

/**
 * Ruta GET para obtener las categorias disponibles en la base de datos.
 * @name ObtenerCategorias
 * @path {GET} /
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo} 
 */
router.get('/', obtenerCategorias)

module.exports = router;