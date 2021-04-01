module.exports = {
    validateBody(schema) {
        const middleware = (request, response, next) => {

            const validation = schema.validate(request.body,
                { abortEarly: false });
            if (validation.error) {
                response.status(400).json({ error: validation.error });
            } else {
                request.body = validation.value;
                next();
            }
        };
        return middleware;
    },
} 