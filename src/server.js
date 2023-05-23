`use strict`;

// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const userRouter = require('./auth/router.js');

// Handlers
const handler404 = require('./error-handlers/404.js');
const handler500 = require('./error-handlers/500.js');

// Express Singleton
const app = express();

// Middleware
app.use(express.json());
app.use(userRouter);
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('*', handler404);
app.use(handler500);

const start = (port) => app.listen(port, () => console.log(`Server up on port ${port}`));

// Exports
module.exports = { start, app };

