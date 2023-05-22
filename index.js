`use strict`;

require('dotenv').config();

const { start } = require('./src/server.js');
const { sequelizeDB } = require('./src/models/index.js');

sequelizeDB.sync().then(() => {
  console.log('Database is connected');
  start();
})
  .catch(e => console.error(e));
