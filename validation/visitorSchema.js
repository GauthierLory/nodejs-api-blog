const Joi = require('joi');

const visitorSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

module.exports = visitorSchema; 