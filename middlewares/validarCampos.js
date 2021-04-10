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
 * @param {Object} req Request. El objeto Request que proviene del cliente con la información
 * que se desea procesar.
 * @param {Object} res Response. El objeto Response que será enviado como respuesta al cliente
 * con la información solicitada.
 * @param {Function} next Funcion next. Indica que se puede pasar al siguiente middleware.
 * @returns {Object} Retorna una respuesta al cliente con el código HTTP 400 para avisarle de los errores.
 * @throws {Error} El método disparará un error si evalúa el objeto Request y el mismo 
 * posee errores grabados por los middlewares anteriormente ejecutados.
 * @since 1.0.0
 * @version 1.0.0
 * @author {@link https://github.com/rcrespoc|Richard Crespo}
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