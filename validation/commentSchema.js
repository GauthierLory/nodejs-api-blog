const Joi = require('joi');

const commentSchema = Joi.object({
    content: Joi.string().required(),
    author_id: Joi.number().integer().required(),
    post_id: Joi.number().integer().required()
})

module.exports = commentSchema;