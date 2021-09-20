const Joi = require('joi');
const response = require('../presentation/helpers/Responsehelper'); //Response helpers

// add joi schema
const schemas = {
    verifyRequest: Joi.object().keys({
        name: Joi.string().required(),
        dob: Joi.date().raw().required(),
        salary: Joi.number().precision(2).required(),
        fileType: Joi.string().required()            
    })
};

const options = {
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true
    },
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: {
            objects: true
        }
    }
};

//Validate Requests
module.exports.verifyrequest = (req, res, next) => {    
    let schema = schemas.verifyRequest;
    let option = options.basic;
    const data = schema.validate({
        ...req.body,
        fileType: req.headers['fileType']
    }, option);

    if (data.error) {
        return response.joierrors(req, res, data.error);
    }
    next()
};