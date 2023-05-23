`use strict`;

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('users', {
    username: { type: DataTypes.STRING, required: true, unique: true },
    password: { type: DataTypes.STRING, required: true },
  });
  
  model.beforeCreate(async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 10);
    console.log('this is the hashed password ', hashedPassword);
    user.password = hashedPassword;
  });
  
  return model;
  
};





