myApp.config(function($routeProvider){
  $routeProvider
  .when("/users", {
    templateUrl: "../partials/users.html"
  })
  .when("/bids", {
    templateUrl: "../partials/bids.html"
  })
  .when("/result", {
    templateUrl: "../partials/result.html"
  })
  .otherwise({
    redirectTo: "/users"
  })
})
