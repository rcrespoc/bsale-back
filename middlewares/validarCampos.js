//@ts-check

/**
 * Modulo que valida los campos antes. Se ejecuta luego de todos los middleware.
 * @module middleware/validarCampos
 */


const { response, request } = require('express');
const { validationResult } = require("express-validator");

/**
 * Funcion que valida que no haya errores en los anteriores middleware, hace uso de express-validator.
 * @function validarCampos
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Funcion next. Indica que se puede pasar al siguiente middleware.
 * @returns {Object} Retorna una respuesta al cliente con el código HTTP 400 para avisarle de los errores.
 */
const validarCampos = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors
    });
  }
  next();
}
module.exports = {
  validarCampos
}