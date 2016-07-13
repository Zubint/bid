myApp.controller("BidsController", function($scope, UserFactory, ProductFactory, BidFactory, $location){
  $scope.sessionUser ={};
  $scope.errorsArray = [];

      ProductFactory.getProducts(function(response){
        if(response.status){
          console.log("products", response.products)
          $scope.products = response.products
          console.log($scope.products);
        }else {
          console.log(response);
        }
      })

      $scope.doneBidding = function(){
        console.log("boo");
        var noEnd =false;
        for(var i in $scope.products){
          if($scope.products[i]._bidId.length<1){
            console.log("no end")
            noEnd=true;
          }else {
            console.log("end")
            $location.url("/result")
          }
        }
        if (noEnd == false){
          //redirect to winnings page
        }else {
          alert("You must bid on all items to end the bid")
        }
      },

      $scope.createBid = function(product){
        console.log("in create bid", product.bidAmount)
        if(product.bidAmount != undefined){
          var newBid ={
            amount: product.bidAmount,
            _userId: sessionUser.user_id,
            _productId: product._id
          }
        // console.log(newBid, " product going to factory")
        }

        BidFactory.createBid(newBid, function(response){
            if(response.status){
              console.log("success")
              ProductFactory.getProducts(function(response){
                if(response.status){
                  console.log("products", response.products)
                  $scope.products = response.products
                  console.log($scope.products);
                }else {
                  console.log(response);
                }
              })
            }else {
              console.log("fail");
              $scope.errorsArray = response.errors;
            }
          })
      }

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
