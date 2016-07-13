myApp.factory("UserFactory", function($http){
  var factory={};

  sessionUser={loggedIn:false};

  factory.getUser=function(callback){
    callback(sessionUser);
    console.log("get user");
  }

    factory.getSession = function(){
      console.log("get session");
      $http.get('/session').success(function(response){
      if(response.status){
        sessionUser = response.sessionUser;
        console.log("factory getSession:", sessionUser);
      }else{
        console.log('session is not set');
      }
    })
  }
    factory.getSession();

  factory.register=function(user, callback){
    // console.log("factoryindex ", user)
    $http.post("/users", user).success(function(response){
      if(response.status){
        sessionUser=response.sessionUser;
      }
        callback(response);
      // console.log(response);
    })
  }

  factory.logout=function(callback){
    $http.get("/logout").success(function(response){
      if(response.status){
        console.log("factory logout response status: " , response.status, response.sessionUser);
        sessionUser = response.sessionUser;
        // console.log("factory session user", sessionUser);
      }
      callback(response);
    });
  }

  //add more methods above

return factory;
})
