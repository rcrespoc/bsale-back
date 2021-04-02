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
 * Ruta GET para obtener las categorias
 * @name ObtenerCategorias
 * @path {GET} /
 */
router.get('/', obtenerCategorias)

module.exports = router;