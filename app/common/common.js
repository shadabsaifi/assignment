var Joi = require("joi"),
    _ = require("lodash"),
    code = require('../common/responseCode');

let response = (res, code, msg, result)=>{
    
    return res.json({
        responseCode:code,
        responseMessage:msg,
        result:result
    })
}

let validate = (schema, options)=>{

    let self = this;
    options = options || {};

    return function validateRequest(req, res, next) {
      var toValidate = {};
      var newSChema = {};
      if (!schema) return next();
      ["params", "body", "query", "headers"].forEach(function (key) {
        if (schema[key]) {
          toValidate = _.extend(toValidate, req[key]);
          newSChema = _.extend(newSChema, schema[key]);
        }
      });
      const { error, value } = Joi.object(newSChema).validate(toValidate, options);
      if (error) {
        let message = error.details[0].message;
        message = message.replace(/['"]+/g, '');
        message = message.split('.').pop();
        message = message.replace(/_/g, ' ');
        return response(res, code.KEY_MISSING, message);
      }
      else {
        req.joi = value;
        return next();
      }
    };
  }

module.exports = {

    response,
    validate
}