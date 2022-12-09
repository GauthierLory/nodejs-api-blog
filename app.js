require('dotenv').config();
const express = require('express');
const routers = require('./routers');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API",
            version: "1.0.0",
            description: "Simple blog api"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./routers/*.js"]
}

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors('*'));
app.use(express.json());
app.use(routers);


const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});

module.exports = server