`use strict`;

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { userModel } = require('./models/index.js');
const basicAuth = require('./middleware/basic.js');

router.post('/signup', async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.create(req.body);
    res.status(200).json(user);
  } catch (e) {
    next(e.message);
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).json(req.user);
});

module.exports = router;
