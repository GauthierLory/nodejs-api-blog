require('dotenv').config();
const express = require('express');

const routers = require('./routers');

const app = express();

app.use(express.json());
app.use(routers);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});