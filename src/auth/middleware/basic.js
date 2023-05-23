`use strict`;

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { userModel } = require('../models');

const basicAuth = async (req, res, next) => {
  let basicHeader = req.headers.authorization.split(' ');
  let encodedString = basicHeader.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await userModel.findOne({ username: username });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      req.user = user;
      next();
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (e) {
    next(e);
  }
};

module.exports = basicAuth;


