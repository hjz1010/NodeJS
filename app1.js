const express = require('express');
const dotenv  = require('dotenv');
dotenv.config();
const router = require('./routers');

const createApp = () => {
    const app = express()

    app.use(express.json())
    app.use(router)

    return app
}

module.exports = { createApp }