var users = require('./../controllers/users.js');
var products = require('./../controllers/products.js');
var bids = require('./../controllers/bids.js');


module.exports = function(app){

  app.post("/users", users.regUser);
  app.get("/session", users.session);
  app.get("/logout", users.logout);

  app.get("/products", products.getProducts);

  app.post("/bids", bids.create);
  app.get ("/bids", bids.getResults);

}
