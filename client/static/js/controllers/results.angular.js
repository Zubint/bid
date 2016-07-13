myApp.controller("ResultsController", function($scope, UserFactory, ProductFactory, BidFactory, $location){
  $scope.sessionUser ={};
  $scope.errorsArray = [];

      BidFactory.getResults(function(response){
        if(response.status){
          console.log("products", response.products)
          $scope.products = response.products
            
          console.log($scope.products);
        }else {
          console.log(response);
        }
      })


    $scope.logout = function(){
      UserFactory.logout(function(response){
        if(response.status){
          console.log("client controller - logout ", response.sessionUser)
          $scope.sessionUser = response.sessionUser
          $location.url("/")
        }else{
          $scope.errorsArray.push(response.errors);
        }
      })
    }

    UserFactory.getUser(function(user_info){
      console.log("call to getUser in controller:" , user_info)
      $scope.sessionUser=user_info;
      console.log("sessionUser in controller: " , $scope.sessionUser.loggedIn);

      if(!$scope.sessionUser.loggedIn){
        console.log(" checking at getUser in controller: ", $scope.sessionUser.loggedIn);
        $location.url("/users");
      }else {
        // $location.url("bids");
      }
    })
  })
