const users = require('./users/users.service.js');
const balance = require('./balance/balance.service.js');
const category = require('./category/category.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(balance);
  app.configure(category);
};
