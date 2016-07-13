myApp.factory("ProductFactory", function($http){
  var factory={};

  sessionUser={loggedIn:false};

    factory.getProducts = function(callback){
      console.log("get products");
      $http.get('/products').success(function(response){
        callback(response);
    })
  }

  //add more methods above

return factory;
})
