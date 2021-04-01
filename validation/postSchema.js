const Joi = require('joi');

const postSchema = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().pattern(/^(([a-z\d]+)-)*[a-z\d]+$/, 'slug').required(),
    excerpt: Joi.string(),
    content: Joi.string(),
    category_id: Joi.number().integer().required()
})

module.exports = postSchema; 